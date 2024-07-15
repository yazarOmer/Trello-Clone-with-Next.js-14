"use client";
import { Organization } from "@prisma/client";
import { CreateOrganizationButton } from "./create-org-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteOrganization } from "@/actions/delete-organization";

type SelectOrganizationProps = {
  organizations: Organization[] | undefined;
};

export const SelectOrganization = ({
  organizations: orgs,
}: SelectOrganizationProps) => {
  const deleteHandle = async (orgId: string) => {
    DeleteOrganizationMutation({ orgId });
  };

  const { mutate: DeleteOrganizationMutation } = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      toast.success("Organization deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex gap-2 flex-wrap max-w-[600px] mx-auto group">
      {orgs?.map((org) => (
        <Button
          asChild
          variant="secondary"
          size="square"
          key={org.id}
          className="px-4 text-wrap"
        >
          <div className="relative">
            <Button
              onClick={() => deleteHandle(org.id)}
              variant="ghost"
              size="icon"
              className="hidden group-hover:flex absolute top-1 right-1 hover:bg-zinc-300 rounded-full p-0"
            >
              <FaRegTrashAlt size={12} />
            </Button>
            <Link
              href={`/organization/${org.id}`}
              className="w-full h-full flex items-center justify-center text-center"
            >
              {org.name}
            </Link>
          </div>
        </Button>
      ))}
      <CreateOrganizationButton />
    </div>
  );
};
