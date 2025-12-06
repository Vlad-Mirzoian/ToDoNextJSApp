import { connectToDatabase } from "@/server/db/db";
import { Task } from "@/server/db/models/Task";
import { TaskItem } from "./TaskItem";
import { TaskType } from "@/features/tasks/types/task";

export async function TaskList() {
  await connectToDatabase();

  const tasks = await Task.find({}).sort({ createdAt: -1 }).lean();

  const plainTasks: TaskType[] = tasks.map((task) => ({
    _id: task._id.toString(),
    title: task.title,
    completed: task.completed,
    createdAt: task.createdAt ? task.createdAt.toISOString() : "",
  }));

  if (plainTasks.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6" />
        <p className="text-2xl font-medium text-gray-600 mb-2">
          No tasks yet
        </p>
        <p className="text-gray-500">Add the first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {plainTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
