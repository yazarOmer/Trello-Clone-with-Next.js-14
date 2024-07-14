import { FormPopover } from "@/components/form-popover";
import { Button } from "@/components/ui/button";
import { getBoards } from "@/data/board";
import { getOrganizationById } from "@/data/organization";
import { Board } from "@prisma/client";
import { FaRegBuilding } from "react-icons/fa";

export default async function OrgIdPage({
  params,
}: {
  params: { orgId: string };
}) {
  const boards = await getBoards(params.orgId);
  const organization = await getOrganizationById(params.orgId);

  return (
    <div className="p-16 lg:pr-64">
      <div className="flex items-center gap-x-6 mb-10">
        <FaRegBuilding size={48} className="text-zinc-700" />
        <h1 className="text-3xl font-bold text-zinc-700">
          {organization?.name}
        </h1>
      </div>

      <h2 className="text-xl font-semibold text-zinc-600 mb-5">Your boards</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board: Board) => (
          <p key={board.id}>{board.title}</p>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video bg-secondary flex items-center justify-center rounded-md hover:opacity-75 transition duration-200"
          >
            <p className="font-semibold text-zinc-700">Create new board</p>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}
