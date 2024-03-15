import Link from "next/link";
import { PenToolIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { spaceFont } from "@/lib/fonts";

interface LogoProps {
  color?: string;
}

export default function Logo({ color }: LogoProps) {
  return (
    <Link className={spaceFont} href="/">
      <div className="flex flex-row space-x-2 items-center justify-center">
        <PenToolIcon size={24} className={color} />
        <span className={cn("font-medium text-lg text-black", color)}>
          PicLoom
        </span>
      </div>
    </Link>
  );
}
