"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export function Second() {
  const { data, dataUpdatedAt } = useSuspenseQuery({
    queryKey: ["users", "list"],
    queryFn: () => getUsers(),
  });

  return (
    <div>
      <h3 className="font-semibold text-xl">
        This component is also using the data
      </h3>
      <ul className="list-disc pl-8">
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <p className="mt-4">
        Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
