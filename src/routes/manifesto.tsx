import { createFileRoute } from "@tanstack/react-router";
import { ManifestoPage } from "@/pages/ManifestoPage";

export const Route = createFileRoute("/manifesto")({
  component: ManifestoPage,
});

