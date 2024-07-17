"use client";
import { createCard } from "@/actions/create-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
}

export const CardForm = ({ listId }: CardFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  useOnClickOutside(formRef, disableEditing);

  const { mutate: createCardMutation } = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      toast.success(`Card '${data.title}' created`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    createCardMutation({
      title,
      listId,
      boardId,
      orgId,
    });
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef}>
        <Textarea
          ref={textareaRef}
          className="mt-2"
          id="title"
          name="title"
          placeholder="Enter your card title..."
        />
        <input hidden id="listId" name="listId" value={listId} />
        <input hidden id="boardId" name="boardId" value={params.boardId} />
        <input hidden id="orgId" name="orgId" value={params.orgId} />
        <div className="flex items-center gap-x-2 mt-2">
          <Button className="bg-sky-700 hover:bg-sky-700/75">Add card</Button>
          <Button
            onClick={() => disableEditing()}
            variant="ghost"
            className="hover:bg-white/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className="pt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => enableEditing()}
        className="h-auto px-2 py-1.5 justify-start text-muted-foreground text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
};
