import { FormPopover } from "@/components/form-popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const MobileCreateButton = () => {
  return (
    <FormPopover side="bottom" sideOffset={10} align="start">
      <Button className="flex items-center justify-center">
        <Plus size={16} />
      </Button>
    </FormPopover>
  );
};
