"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { updateUser, getUsers } from "../api";
import { User } from "@/app/types";
import { toast } from "sonner";

export function Users() {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["users", "list"],
    queryFn: () => getUsers(),
  });
  const updateUserMutation = useMutation({
    mutationFn: (data: User) => updateUser(data.id, data),
    onMutate: async (updatedUser) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users", "list"] });
      // Snapshot the previous value (for rollback)
      const previousUsers = queryClient.getQueryData(["users", "list"]);
      // Optimistically update the cache
      queryClient.setQueryData(["users", "list"], (old: User[]) => {
        return old.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
      // Return the previous value
      return { previousUsers };
    },
    onError: (err, newUser, context) => {
      // Rollback the cache to the previous value
      queryClient.setQueryData(
        ["users", "list"],
        context ? context.previousUsers : []
      );

      toast.error("Failed to update user");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      toast.success("User updated successfully");
    },
  });

  return (
    <div>
      <table className="w-full border border-white">
        <thead className="border border-white text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button
                  className="p-2 bg-red-500 text-white rounded ml-2"
                  onClick={() =>
                    updateUserMutation.mutate({
                      ...user,
                      name: `${user.name} - [UPDATED]`,
                    })
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
