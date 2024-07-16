import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CardForm = () => {
  return (
    <div className="pt-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-auto px-2 py-1.5 justify-start text-muted-foreground text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
};
