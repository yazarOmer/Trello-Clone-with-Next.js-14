import { Board } from "@prisma/client";
import Link from "next/link";

interface BoardCardProps {
  key: string;
  data: Board;
  orgId: string;
}

export const BoardCard = ({ key, data, orgId }: BoardCardProps) => {
  return (
    <Link
      style={{ backgroundImage: `url(${data.imageThumbUrl})` }}
      href={`/organization/${orgId}/board/${data.id}`}
      className="bg-slate-400 rounded-md h-full w-full aspect-video p-4 bg-no-repeat bg-center bg-cover relative overflow-hidden group"
    >
      <div className="bg-black/30 absolute inset-0 group-hover:bg-black/50 transition" />
      <h3 className="font-bold relative text-white">{data.title}</h3>
    </Link>
  );
};
