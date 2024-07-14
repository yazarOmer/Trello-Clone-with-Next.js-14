import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { BoardTitle } from "./board-title";

interface BoardHeaderProps {
  board: Board | null | undefined;
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
  return (
    <div className="w-full h-14 px-5 flex items-center absolute justify-between bg-black/60">
      <BoardTitle board={board} />
      <Button variant="ghost" size="icon" className="hover:bg-black/50">
        <IoMdMore
          size={24}
          className="text-white bg-transparent hover:text-white "
        />
      </Button>
    </div>
  );
};
