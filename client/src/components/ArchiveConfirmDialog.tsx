import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Habit } from "@/types/habit";

interface ArchiveConfirmDialogProps {
  habit: Habit | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ArchiveConfirmDialog({
  habit,
  onConfirm,
  onCancel,
}: ArchiveConfirmDialogProps) {
  return (
    <AlertDialog open={!!habit} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Habit</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive "{habit?.name}"? It will be moved
            to your archived habits. You can restore it anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Archive
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
