export interface LocationPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllowLocation: () => void;
  onDenyLocation: () => void;
}
