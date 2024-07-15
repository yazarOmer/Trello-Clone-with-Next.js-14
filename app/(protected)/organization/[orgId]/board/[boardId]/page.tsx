import { getBoardById } from "@/data/board";
import { getListsByBoardId } from "@/data/list";
import { ListContanier } from "./_components/list-container";

export default async function BoardIdPage({
  params,
}: {
  params: { boardId: string };
}) {
  const lists = await getListsByBoardId(params.boardId);
  const board = await getBoardById(params.boardId);

  return (
    <div
      style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
      className="w-full h-full bg-cover bg-no-repeat bg-center pt-16 px-2"
    >
      <ListContanier data={lists} />
    </div>
  );
}
