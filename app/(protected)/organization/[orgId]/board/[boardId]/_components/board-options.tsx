"use client";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { IoMdMore } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";

interface BoardOptionsProps {
  board: Board | null | undefined;
}

export const BoardOptions = ({ board }: BoardOptionsProps) => {
  const params = useParams();

  const deleteHandle = async () => {
    DeleteBoardMutation({
      id: params.boardId as string,
      orgId: params.orgId as string,
    });
  };

  const { mutate: DeleteBoardMutation } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      toast.success("Board deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="hover:bg-black/50">
          <IoMdMore
            size={24}
            className="text-white bg-transparent hover:text-white "
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-48 p-0 py-1">
        <Button
          onClick={deleteHandle}
          variant="ghost"
          className="w-full rounded-none"
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
