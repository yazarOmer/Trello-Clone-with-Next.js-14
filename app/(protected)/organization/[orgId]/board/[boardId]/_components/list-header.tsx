"use client";
import { updateList } from "@/actions/update-list";
import { Input } from "@/components/ui/input";
import { List } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const { mutate: updateListMutation } = useMutation({
    mutationFn: updateList,
    onSuccess: (data) => {
      toast.success(`List "${data.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error("Failed to update list");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    updateListMutation({
      title,
      id,
      boardId,
      orgId,
    });
  };

  useOnClickOutside(formRef, disableEditing);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <input hidden id="orgId" name="orgId" value={params.orgId} />
          <Input
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            name="title"
            placeholder="Enter list title"
            defaultValue={data.title}
            className="py-0 text-sm border-none focus-visible:border-none focus-visible:outline-none outline-none h-7"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
        >
          {data.title}
        </div>
      )}
    </div>
  );
};
