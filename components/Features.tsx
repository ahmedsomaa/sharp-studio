import Link from "next/link";
import { RepeatIcon, ScalingIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Features() {
  return (
    <section className="relative h-[350px] w-full  px-4 md:h-[350px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center">
        <h2 className="sm:text-4xl/ text-3xl max-w-[708px] font-bold text-slate-900">
          Available Tools
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-14">
          <Link href="/converter">
            <Card className="w-[400px] hover:border-primary hover:cursor-pointer">
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-row items-center gap-2">
                    <RepeatIcon size={24} />
                    <h3 className="text-lg font-medium leading-none">
                      Image Converter
                    </h3>
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                  Quickly convert your images from one format to another.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/resizer">
            <Card className="w-[400px] hover:border-primary hover:cursor-pointer">
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-row items-center gap-2">
                    <ScalingIcon size={24} />
                    <h3 className="text-lg font-medium leading-none">
                      Image Resizer
                    </h3>
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                  Quickly change the dimensions of your images.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}