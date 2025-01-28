"use client";

import { useQueryClient } from "@tanstack/react-query";

export function Actions() {
  const queryClient = useQueryClient();

  return (
    <div className="flex gap-4">
      <button
        className="p-4 bg-white cursor-pointer border border-gray-300 rounded-lg text-black"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        }}
      >
        Invalidate Query
      </button>
    </div>
  );
}
