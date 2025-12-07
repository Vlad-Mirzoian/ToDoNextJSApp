import { AddTaskForm } from "@/features/tasks/components/AddTaskForm";
import { TaskList } from "@/features/tasks/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center pt-4 sm:pt-0 pb-4 mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Tasks
        </h1>

        <div className="mb-8">
          <AddTaskForm />
        </div>

        <TaskList />
      </div>
    </main>
  );
}
