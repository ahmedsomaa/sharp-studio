import { PenToolIcon } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <PenToolIcon size={30} className="text-primary" />
      <h1 className="text-xl font-medium text-primary md:text-3xl">PicLoom</h1>
    </div>
  );
}
