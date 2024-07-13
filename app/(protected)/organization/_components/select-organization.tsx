import { Organization } from "@prisma/client";
import { CreateOrganizationButton } from "./create-org-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SelectOrganizationProps = {
  organizations: Organization[] | undefined;
};

export const SelectOrganization = ({
  organizations: orgs,
}: SelectOrganizationProps) => {
  return (
    <div className="flex gap-2 flex-wrap max-w-[600px] mx-auto ">
      {orgs?.map((org) => (
        <Button
          asChild
          variant="secondary"
          size="square"
          key={org.id}
          className="px-4 text-wrap"
        >
          <Link href={`/organization/${org.id}`} className="text-center">
            {org.name}
          </Link>
        </Button>
      ))}
      <CreateOrganizationButton />
    </div>
  );
};
