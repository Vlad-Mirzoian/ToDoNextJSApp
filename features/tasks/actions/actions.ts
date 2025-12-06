"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/db/db";
import { Task } from "@/server/db/models/Task";

type FormState = {
  error: string | null;
  success: boolean;
};

export async function addTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title")?.toString()?.trim();

  if (!title || title.length === 0) {
    return {
      error: "Task cannot be empty.",
      success: false,
    };
  }
  if (title.length > 200) {
    return {
      error: "Title too long (max. 200 characters)",
      success: false,
    };
  }

  try {
    await connectToDatabase();
    const normalizedTitle = title.toLowerCase().trim();
    const exsistingTask = await Task.findOne({
      title: { $regex: `^${normalizedTitle}$`, $options: "i" },
    });
    if (exsistingTask) {
      return { error: "Task with this title already exists", success: false };
    }
    await Task.create({ title });
    revalidatePath("/");
    return { error: null, success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message, success: false };
    }
    return { error: "Failed to add task", success: false };
  }
}

export async function toggleTask(id: string) {
  await connectToDatabase();
  const task = await Task.findById(id);
  if (task) {
    task.completed = !task.completed;
    await task.save();
    revalidatePath("/");
  }
}

export async function deleteTask(id: string) {
  await connectToDatabase();
  await Task.findByIdAndDelete(id);
  revalidatePath("/");
}
