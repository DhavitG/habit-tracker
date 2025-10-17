import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-110 z-50"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
