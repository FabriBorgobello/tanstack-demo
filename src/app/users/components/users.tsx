"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export function Users() {
  const { data, dataUpdatedAt } = useSuspenseQuery({
    queryKey: ["users", "list"],
    queryFn: () => getUsers(),
  });

  return (
    <div>
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
