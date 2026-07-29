import { interiorDestinationEditorial } from "@/lib/destination-editorial-interior";
import { northDestinationEditorial } from "@/lib/destination-editorial-north";
import { southDestinationEditorial } from "@/lib/destination-editorial-south";
import type { DestinationEditorial } from "@/lib/destination-editorial-types";

export const destinationEditorial: Readonly<
  Record<string, DestinationEditorial>
> = {
  ...northDestinationEditorial,
  ...interiorDestinationEditorial,
  ...southDestinationEditorial,
};

export function getDestinationEditorial(slug: string) {
  return destinationEditorial[slug];
}
