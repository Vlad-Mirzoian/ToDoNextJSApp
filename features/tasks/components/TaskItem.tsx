"use client";

import { toggleTask, deleteTask } from "@/features/tasks/actions/actions";
import { TaskType } from "@/features/tasks/types/task";

export function TaskItem({ task }: { task: TaskType }) {
  const id = task._id.toString();

  return (
    <div
      className={`group flex items-center justify-between p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg
        ${
          task.completed
            ? "bg-gray-100/80 border-gray-300 opacity-90"
            : "bg-white/95 border-gray-200 shadow-md"
        }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <form action={() => toggleTask(id)}>
          <button
            type="submit"
            className="shrink-0 w-8 h-8 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center transition-all hover:border-blue-500"
          >
            {task.completed && (
              <div className="w-5 h-5 bg-linear-to-r from-blue-600 to-purple-600 rounded-full" />
            )}
          </button>
        </form>

        <span
          className={`text-lg font-medium truncate ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <form action={() => deleteTask(id)}>
        <button
          type="submit"
          className="ml-3 opacity-0 group-hover:opacity-100 text-red-600 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm sm:text-base"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
