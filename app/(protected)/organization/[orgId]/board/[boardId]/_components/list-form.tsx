"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  useOnClickOutside(formRef, disableEditing);

  const { mutate: createListMutation } = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success(`List "${data.title}" created`);
      } else {
        toast.error(data.error);
      }
      disableEditing();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    createListMutation({
      title,
      orgId,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          className="w-full p-3 shadow-md bg-white space-y-3 rounded-md"
          ref={formRef}
        >
          <Input
            ref={inputRef}
            id="title"
            name="title"
            className="text-sm px-2 py-1 font-medium h-7 border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <input hidden value={params.orgId} name="orgId" />
          <div className="flex items-center gap-x-2">
            <Button
              variant="default"
              size="sm"
              className="bg-sky-700 hover:bg-sky-700/75"
            >
              Add list
            </Button>
            <Button onClick={disableEditing} variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="bg-white/80 hover:bg-white/50 transition w-full p-3 rounded-md font-semibold flex items-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
