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
      <div className="text-center py-16 sm:py-24">
        <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6" />
        <p className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-2">
          No tasks yet
        </p>
        <p className="text-gray-500 text-base sm:text-lg">
          Add your first task above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plainTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
