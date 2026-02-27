import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  CircleQuestionMark,
  CircleCheckBig,
  CircleAlert,
  Trash2,
  Loader2,
} from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertDialogPrimaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  hideConfirm?: boolean;
  variant?: AlertVariant;
  isDeleteText?: string;
  isLoading?: boolean;
}

export default function AlertDialogPrimary({
  open,
  onOpenChange,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action? This will update the system settings.",
  cancelText = "Cancel",
  confirmText = "Proceed",
  onConfirm,
  onCancel,
  variant = "info",
  isDeleteText = "",
  isLoading = false,
  hideConfirm = false,
}: AlertDialogPrimaryProps) {
  const styles = variantStyles[variant];
  const DefaultIcon = styles.defaultIcon;

  const handleConfirm = () => {
    // Let parent manage loading state and closing the dialog after async work
    onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Only close modal if not loading
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        // Prevent closing during loading
        if (!isLoading) {
          onOpenChange(open);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="flex items-center gap-3 text-lg font-medium">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}
            >
              <DefaultIcon className={`h-5 w-5 ${styles.iconColor}`} />
            </div>
            <h1 className="text-lg font-medium">{title}</h1>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-secondary">
            {description}
            {isDeleteText && (
              <div className="flex bg-orange-primary/5 rounded-10 p-2.5 border border-orange-primary/15 text-orange-primary gap-2 mt-5">
                <CircleAlert size={16} className="shrink-0" />
                <p className="text-red-primary text-xs">{isDeleteText}</p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel
            onClick={handleCancel}
            disabled={isLoading}
            variant={"outline"}
            size={"lg"}
          >
            {cancelText}
          </AlertDialogCancel>
          {!hideConfirm && (
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              size={"lg"}
              variant={"destructive"}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {confirmText}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const variantStyles = {
  info: {
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    buttonBg: "bg-primary hover:bg-primary/90",
    defaultIcon: CircleQuestionMark,
  },
  success: {
    iconBg: "bg-green-primary/15",
    iconColor: "text-green-primary",
    buttonBg: "bg-green-primary hover:bg-green-primary/90",
    defaultIcon: CircleCheckBig,
  },
  warning: {
    iconBg: "bg-orange-primary/15",
    iconColor: "text-orange-primary",
    buttonBg: "bg-orange-primary hover:bg-orange-primary/90",
    defaultIcon: CircleAlert,
  },
  error: {
    iconBg: "bg-red-primary/15",
    iconColor: "text-red-primary",
    buttonBg: "bg-red-primary hover:bg-red-primary/90",
    defaultIcon: Trash2,
  },
};
