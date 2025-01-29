"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { updateUser, getUsers } from "../api";
import { User } from "@/app/types";
import { toast } from "sonner";
import { Switch } from "./switch";

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
      const previousUsers = queryClient.getQueryData<User[]>(["users", "list"]);
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
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  return (
    <div>
      <table className="w-full border border-white">
        <thead className="border border-white text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <Switch
                  value={user.active}
                  onChange={(value) =>
                    updateUserMutation.mutate({ ...user, active: value })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
