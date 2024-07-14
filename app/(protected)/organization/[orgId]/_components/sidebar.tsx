import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getOrganizations } from "@/data/organization";
import { Plus } from "lucide-react";
import { NavItem } from "./nav-item";
import { Accordion } from "@/components/ui/accordion";

interface SidebarProps {
  orgId: string;
}

export const Sidebar = async ({ orgId }: SidebarProps) => {
  const session = await auth();
  const organizations = await getOrganizations(session?.user?.id as string);

  return (
    <nav className="w-[300px] hidden md:flex flex-col border-r items-center px-2 py-5">
      <div className="flex items-center justify-between w-full mb-3 px-5">
        <h2 className="text-zinc-700 font-semibold">My Organizations</h2>
        <Button variant="ghost" size="icon">
          <Plus size={16} className="text-zinc-700" />
        </Button>
      </div>
      <Accordion type="multiple" className="w-full p-2">
        {organizations?.map((org) => (
          <NavItem key={org.id} org={org} orgId={orgId} />
        ))}
      </Accordion>
    </nav>
  );
};
