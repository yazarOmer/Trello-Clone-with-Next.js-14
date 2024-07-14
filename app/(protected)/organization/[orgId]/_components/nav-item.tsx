import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Organization } from "@prisma/client";
import Link from "next/link";
import { FcOrganization } from "react-icons/fc";
import { FiLayout, FiActivity } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";

interface NavItemProps {
  org: Organization;
  orgId: string;
}

export const NavItem = ({ org, orgId }: NavItemProps) => {
  const routes = [
    {
      id: 1,
      name: "Boards",
      href: `/organization/${org.id}`,
      icon: <FiLayout size={18} className="text-zinc-700" />,
    },
    {
      id: 2,
      name: "Activity",
      href: `/organization/${org.id}/activity`,
      icon: <FiActivity size={18} className="text-zinc-600" />,
    },
  ];

  return (
    <AccordionItem value={org.id} className="border-none">
      <AccordionTrigger className="hover:no-underline text-base font-medium hover:bg-secondary rounded-md p-3">
        <div>
          <FaRegBuilding size={20} className="text-zinc-700" />
        </div>
        {org.name}
      </AccordionTrigger>
      <AccordionContent className="px-3 mt-2 flex flex-col">
        {routes.map((route) => (
          <Button
            asChild
            key={route.id}
            variant="ghost"
            className="flex gap-x-3 items-center text-zinc-700 font-medium"
          >
            <Link href={route.href}>
              {route.icon}
              {route.name}
            </Link>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
