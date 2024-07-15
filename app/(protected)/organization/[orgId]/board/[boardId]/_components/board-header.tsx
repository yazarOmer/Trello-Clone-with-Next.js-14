import { Board } from "@prisma/client";
import { BoardTitle } from "./board-title";
import { BoardOptions } from "./board-options";

interface BoardHeaderProps {
  board: Board | null | undefined;
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
  return (
    <div className="w-full h-14 px-5 flex items-center absolute justify-between bg-black/60">
      <BoardTitle board={board} />
      <BoardOptions board={board} />
    </div>
  );
};
