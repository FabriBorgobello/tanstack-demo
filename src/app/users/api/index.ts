import { User } from "@/app/types";

const BASE_URL = "http://localhost:3001/users";

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Something went wrong");
  const url = `${BASE_URL}?_limit=5`;
  const response = await fetch(url);
  const data = (await response.json()) as User[];
  return data;
}

export async function updateUser(id: User["id"], updatedUser: Partial<User>) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Something went wrong");
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  const data = (await response.json()) as User;
  return data;
}
