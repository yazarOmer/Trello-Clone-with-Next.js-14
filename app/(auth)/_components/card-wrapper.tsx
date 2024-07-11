import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import logo from "@/public/logo.svg";

type CardWrapperProps = {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
  footerLabel: string;
  footerAction: string;
  footerHref: string;
};

const headerFont = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const CardWrapper = ({
  children,
  headerTitle,
  headerDescription,
  footerLabel,
  footerAction,
  footerHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[450px] flex flex-col items-center px-5">
      <CardHeader className="flex flex-col items-center gap-y-2">
        <Image
          src={logo}
          width={50}
          height={50}
          alt="Tasker logo"
          className="mb-5"
        />
        <h1 className={`text-3xl font-semibold ${headerFont.className}`}>
          {headerTitle}
        </h1>
        <p className={`text-sm text-muted-foreground ${headerFont.className}`}>
          {headerDescription}
        </p>
      </CardHeader>

      <CardContent className="w-full">{children}</CardContent>

      <CardFooter className="w-full flex flex-col gap-y-2">
        <div className="w-full h-[1px] bg-muted-foreground/25 relative mb-3">
          <span className="absolute text-xs text-muted-foreground p-1 bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full flex items-center gap-x-2">
          <FcGoogle />
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full flex items-center gap-x-2">
          <FaGithub />
          Continue with GitHub
        </Button>

        <div className="flex items-center gap-x-2 my-3">
          <p className="text-sm font-bold">{footerLabel}</p>
          <Link
            className="text-sm font-medium hover:underline text-blue-800"
            href={footerHref}
          >
            {footerAction}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
