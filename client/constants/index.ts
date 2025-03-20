import { Coordinates } from "@/types/weather";

export interface LocationPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllowLocation: () => void;
  onDenyLocation: () => void;
}

export const DEFAULT_COORDINATES: Coordinates = {
  lat: 40.712776,
  lon: -74.005974,
};
