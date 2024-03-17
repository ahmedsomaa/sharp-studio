import Link from "next/link";
import { RepeatIcon, ScalingIcon, ShrinkIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Features() {
  return (
    <div className="mb-44 md:mb-20">
      <section className="relative h-[350px] w-full  px-4 md:h-[350px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex h-full w-full flex-col items-center">
          <h2 className="sm:text-5xl/ text-4xl max-w-[708px] font-bold text-slate-900">
            Available Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-14">
            <Link href="/convert">
              <Card className="w-[400px] hover:border-primary hover:cursor-pointer">
                <CardHeader>
                  <CardTitle>
                    <div className="flex flex-row items-center gap-2">
                      <RepeatIcon size={24} />
                      <h3 className="text-lg font-medium leading-none">
                        Convert
                      </h3>
                    </div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                    Quickly convert your images from one format to another.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/resize">
              <Card className="w-[400px] hover:border-primary hover:cursor-pointer">
                <CardHeader>
                  <CardTitle>
                    <div className="flex flex-row items-center gap-2">
                      <ScalingIcon size={24} />
                      <h3 className="text-lg font-medium leading-none">
                        Resize
                      </h3>
                    </div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                    Quickly change the dimensions of your images.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/compress">
              <Card className="w-[400px] hover:border-primary hover:cursor-pointer">
                <CardHeader>
                  <CardTitle>
                    <div className="flex flex-row items-center gap-2">
                      <ShrinkIcon size={24} />
                      <h3 className="text-lg font-medium leading-none">
                        Compress
                      </h3>
                    </div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                    Quickly compress your images for faster websites.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
