"use client";

import { toggleTask, deleteTask } from "@/features/tasks/actions/actions";
import { TaskType } from "@/features/tasks/types/task";

export function TaskItem({ task }: { task: TaskType }) {
  const id = task._id.toString();

  return (
    <div
      className={`
    group flex items-center justify-between p-6 rounded-2xl border backdrop-blur-sm
    transition-all duration-300 hover:shadow-xl
    ${
      task.completed
        ? "bg-gray-100/70 border-gray-200 opacity-90"
        : "bg-white/90 border-gray-200 shadow-lg"
    }
  `}
    >
      <div className="flex items-center gap-5">
        <form action={() => toggleTask(id)}>
          <button
            type="submit"
            className="relative w-7 h-7 rounded-full border-2 border-gray-300 bg-white hover:border-blue-500 transition-all"
          >
            {task.completed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-full scale-110" />
              </div>
            )}
          </button>
        </form>

        <span
          className={`text-lg font-medium transition-all ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <form action={() => deleteTask(id)}>
        <button
          type="submit"
          className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
