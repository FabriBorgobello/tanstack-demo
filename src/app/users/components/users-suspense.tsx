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
      <table className="w-full border border-white">
        <thead className="border border-white text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4">
        Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
