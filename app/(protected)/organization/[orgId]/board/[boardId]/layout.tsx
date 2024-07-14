import { getBoardById } from "@/data/board";
import { Header } from "../../_components/header";
import { BoardHeader } from "./_components/board-header";

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    orgId: string;
    boardId: string;
  };
}) {
  const board = await getBoardById(params.boardId);

  return (
    <div>
      <Header orgId={params.orgId} />
      <div className="w-full h-[calc(100vh-64px)] relative">
        <BoardHeader board={board} />
        {children}
      </div>
    </div>
  );
}
