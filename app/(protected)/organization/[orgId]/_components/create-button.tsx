import { FormPopover } from "@/components/form-popover";
import { Button } from "@/components/ui/button";

export const CreateButton = () => {
  return (
    <FormPopover side="bottom" sideOffset={10} align="start">
      <Button variant="secondary">Create</Button>
    </FormPopover>
  );
};
