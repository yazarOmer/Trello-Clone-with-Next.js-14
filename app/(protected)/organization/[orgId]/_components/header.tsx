import { CreateButton } from "./create-button";
import { Logo } from "./logo";
import { MobileCreateButton } from "./mobile-create-button";
import { UserButton } from "./user-button";

interface HeaderProps {
  orgId: string;
}

export const Header = ({ orgId }: HeaderProps) => {
  return (
    <div className="w-full h-16 shadow-sm flex items-center justify-between px-5 md:px-7">
      <div className="hidden md:flex items-center gap-3">
        <Logo />
        <CreateButton />
      </div>
      <div className="flex md:hidden">
        <MobileCreateButton />
      </div>
      <UserButton />
    </div>
  );
};
