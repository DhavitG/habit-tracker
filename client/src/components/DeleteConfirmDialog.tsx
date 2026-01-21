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
import { Habit } from "./types";

interface DeleteConfirmDialogProps {
  habit: Habit | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ habit, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={!!habit} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Habit</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{habit?.name}"? This action cannot be undone 
            and you'll lose your {habit?.streak}-day streak.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
