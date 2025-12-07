"use client";

import { addTask } from "../actions/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";

type FormState = {
  error: string | null;
  success: boolean;
};

function SubmitButton({ hasText }: { hasText: boolean }) {
  const { pending } = useFormStatus();

  const isDisabled = pending || !hasText;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`text-lg w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg
        ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl active:scale-95"
        }`}
    >
      {pending ? "Adding..." : "Add Task"}
    </button>
  );
}

export function AddTaskForm() {
  const [value, setValue] = useState("");

  const enhancedAddTask = async (prevState: FormState, formData: FormData) => {
    const result = await addTask(prevState, formData);
    if (result.success) {
      setValue("");
    }
    return result;
  };

  const [state, formAction] = useActionState(enhancedAddTask, {
    error: null,
    success: false,
  });

  const hasText = value.trim().length > 0;

  return (
    <>
      <form
        action={formAction}
        className="flex flex-col sm:flex-row gap-3 bg-white/90 p-5 sm:p-8 rounded-2xl shadow-xl border border-gray-200/50"
      >
        <input
          type="text"
          name="title"
          id="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-5 py-4 text-lg font-medium text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all"
        />
        <SubmitButton hasText={hasText} />
      </form>

      {state?.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium animate-pulse">
          {state.error}
        </div>
      )}
    </>
  );
}
