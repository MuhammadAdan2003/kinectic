import { createFileRoute } from "@tanstack/react-router";
import { GrowthLabPage } from "@/pages/GrowthLabPage";

export const Route = createFileRoute("/growth-lab")({
  component: GrowthLabPage,
});

