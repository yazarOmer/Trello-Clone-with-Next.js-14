import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import userImage from "@/public/user.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export const UserButton = async () => {
  const session = await auth();

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={session?.user?.image || userImage}
          width={48}
          height={48}
          alt="User image"
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        className="mr-4 w-52 flex flex-col items-center"
      >
        <Image
          src={session?.user?.image || userImage}
          width={64}
          height={64}
          alt="User image"
          className="rounded-full mb-2"
        />
        <p className="font-semibold text-lg">{session?.user?.name}</p>

        <p className="text-muted-foreground text-xs my-1">
          {session?.user?.email}
        </p>

        <div className="w-full mx-auto h-[1px] bg-muted-foreground/20 my-2"></div>

        <form
          className="w-full"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button variant="outline" className="w-full">
            Sign out
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
