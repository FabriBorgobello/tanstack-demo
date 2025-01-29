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
    onError: () => {
      toast.error("Failed to update user");
    },
    onSuccess: () => {
      // OPTION 1: Replace the updated user in the cache
      // if (newUser) {
      //   console.log(newUser);
      //   queryClient.setQueryData(["users", "list"], (old: User[]) => {
      //     return old.map((user) => (user.id === newUser.id ? newUser : user));
      //   });
      // }

      // OPTION 2: Invalidate the cache
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
