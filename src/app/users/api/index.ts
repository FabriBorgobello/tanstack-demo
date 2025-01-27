import { User } from "@/app/types";

export async function getUsers(shouldSucceed: boolean = true) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!shouldSucceed) {
    throw new Error("Failed to fetch users");
  }
  const url = `https://jsonplaceholder.typicode.com/Users?_limit=5`;
  const response = await fetch(url);
  const data = (await response.json()) as User[];
  return data;
}
