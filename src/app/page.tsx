import { Users } from "./users/components/users-basic";

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <Users />
    </div>
  );
}
