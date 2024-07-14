"use client";
import { updateBoard } from "@/actions/update-board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Board } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleProps {
  board: Board | null | undefined;
}

export const BoardTitle = ({ board }: BoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board?.title);

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const params = useParams();

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

  const { mutate: updateBoardMutation } = useMutation({
    mutationFn: updateBoard,
    onSuccess: (data) => {
      toast.success(`Board name updated to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    updateBoardMutation({
      title,
      id: params.boardId as string,
      orgId: params.orgId as string,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef}>
        <Input
          id="title"
          name="title"
          ref={inputRef}
          className="text-lg font-bold px-2 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none text-white"
          defaultValue={board?.title}
          onBlur={onBlur}
        />
      </form>
    );
  }
  return (
    <Button
      variant="ghost"
      className="text-white text-base font-bold hover:bg-black/50 hover:text-white"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
