"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { ElementRef, useRef } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { Label } from "./ui/label";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side,
  align,
  sideOffset,
}: FormPopoverProps) => {
  const popoverRef = useRef<ElementRef<"button">>(null);
  const params = useParams();

  const { mutate: createBoardMutation, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(`Board "${data.title}" created`);
        // navigate board page
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    const orgId = params.orgId as string;
    createBoardMutation({ title, image, orgId });
    popoverRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80"
      >
        <h2 className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </h2>
        <PopoverClose ref={popoverRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit}>
          <FormPicker id="image" />
          <div className="space-y-2 my-3">
            <Label>Board title</Label>
            <Input name="title" id="title" />
          </div>

          <Button type="submit" className="w-full">
            Create Board
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
