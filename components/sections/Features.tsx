import Link from "next/link";
import { RepeatIcon, ScalingIcon, ShrinkIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import React from "react";

const features = [
  {
    title: "Convert",
    icon: <RepeatIcon size={24} className="group-hover:text-primary" />,
    path: "/convert",
    description: "Quickly convert your images from one format to another.",
  },
  {
    title: "Resize",
    icon: <ScalingIcon size={24} className="group-hover:text-primary" />,
    path: "/resize",
    description: "Quickly change the dimensions of your images.",
  },
  {
    title: "Compress",
    icon: <ShrinkIcon size={24} className="group-hover:text-primary" />,
    path: "/compress",
    description: "Quickly compress your images for faster websites.",
  },
];

export default function Features() {
  return (
    <div className="mt-16 mb-80 md:mb-44">
      <section className="relative h-[350px] w-full  px-4 md:h-[350px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex h-full w-full flex-col items-center">
          <h2 className="sm:text-5xl/ text-4xl max-w-[708px] font-bold text-slate-900">
            Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-14">
            {features.map(({ title, icon, path, description }) => (
              <Link key={title} href={path}>
                <Card className="min-w-fit group hover:border-primary hover:cursor-pointer">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex flex-col gap-3">
                        {icon}
                        <h3 className="text-lg group-hover:text-primary font-semibold leading-none">
                          {title}
                        </h3>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-md leading-snug text-muted-foreground">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
