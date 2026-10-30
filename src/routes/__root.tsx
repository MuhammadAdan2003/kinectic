import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TransitionProvider } from "@/context/TransitionContext";
import { RootLayout } from "@/components/layout/RootLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TransitionProvider>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </TransitionProvider>
  );
}

