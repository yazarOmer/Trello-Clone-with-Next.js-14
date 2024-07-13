import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href="/organization" className="flex items-center gap-x-4 mr-8">
      <Image src={logo} width={32} height={32} alt="Logo" />
      <p className={cn("text-2xl font-bold text-zinc-700", poppins.className)}>
        Tasker
      </p>
    </Link>
  );
};
