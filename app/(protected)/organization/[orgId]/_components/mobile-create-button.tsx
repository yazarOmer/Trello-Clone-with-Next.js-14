import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const MobileCreateButton = () => {
  return (
    <Button className="flex items-center justify-center">
      <Plus size={16} />
    </Button>
  );
};
