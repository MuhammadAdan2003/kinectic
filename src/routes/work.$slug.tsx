import { createFileRoute } from "@tanstack/react-router";
import { WorkDetailPage } from "@/pages/WorkDetailPage";

export const Route = createFileRoute("/work/$slug")({
  component: WorkRouteComponent,
});

function WorkRouteComponent() {
  const { slug } = Route.useParams();
  return <WorkDetailPage slug={slug} />;
}

