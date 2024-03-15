import React from "react";
import Link from "next/link";
import Image from "next/image";

import { spaceFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-14 relative">
      <div className="flex flex-col md:flex-col md:space-x-4 md:space-y-0 items-center gap-5">
        <div className="relative mx-auto max-w-3xl text-center gap-3">
          <h1
            className={cn(
              "bg-gradient-to-br from-black to-zinc-600 bg-clip-text text-4xl/[1.07] font-bold tracking-tight text-transparent md:text-6xl/[1.07]",
              spaceFont
            )}
          >
            High Image Processing with
            <span className="text-primary"> Sharp!</span>
          </h1>
          <p className="mt-6 text-md font-medium text-zinc-600 md:text-lg">
            Resize, convert and edit your images with precision and ease!
          </p>
          <div className="mt-6 flex flex-col items-center justify-center   gap-y-8">
            <Button
              asChild
              size="lg"
              variant="default"
              className="font-semibold"
            >
              <Link href="">Get Started</Link>
            </Button>
          </div>
        </div>
        <div className="-m-2 rounded-xl bg-neutral-900/5 dark:bg-neutral-100/10 p-2 ring-1 ring-inset ring-neutral-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            alt="Hero"
            height="400"
            width="600"
            src="/img/hero-img.png"
            style={{
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
            className="rounded-md bg-white shadow-2xl ring-1 ring-sky-900/10"
          />
        </div>
      </div>
    </div>
  );
}
