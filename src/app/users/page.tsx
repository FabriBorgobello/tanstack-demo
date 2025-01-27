import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Actions } from "./components/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Second } from "./components/second";
import { Users } from "./components/users";

export default async function UsersPage() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["users", "list"],
  //   queryFn: () => getUsers(),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        </ErrorBoundary>
        <Actions />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Second />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrationBoundary>
  );
}
