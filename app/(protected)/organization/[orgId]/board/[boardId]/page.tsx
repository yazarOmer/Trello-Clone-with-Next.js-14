import { getBoardById } from "@/data/board";

export default async function BoardIdPage({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await getBoardById(params.boardId);

  return (
    <div
      style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
      className="w-full h-full bg-cover bg-no-repeat bg-center"
    ></div>
  );
}
