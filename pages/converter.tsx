import React, { useMemo, useState } from "react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { spaceFont } from "@/lib/fonts";
import Dropzone from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// TODO: Move to lib/formats
const formats = [
  { name: "PNG", value: "png" },
  { name: "JPG", value: "jpg" },
  { name: "WEBP", value: "webp" },
];

export default function Converter() {
  const [format, setFormat] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const extension = useMemo(
    () =>
      ["jpeg", "jpg"].includes(selectedImage?.type.split("/")[1] as string)
        ? "jpg"
        : selectedImage?.type.split("/")[1],
    [selectedImage]
  );

  // --- handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImage) return;
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (selectedImage) return;
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (selectedImage) return;

    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleOnDelete = () => {
    setFormat("");
    setSelectedImage(null);
  };

  const onConvert = () => {
    // TODO: add conversion logic
    console.log("Start converting here");
  };

  return (
    <div>
      <div className="relative h-[350px] w-full px-4 md:h-[603px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex h-full max-w-screen-md	 mx-auto w-full flex-col items-center gap-5">
          <h2 className="sm:text-4xl/ text-3xl max-w-[708px] font-bold text-slate-900">
            Image Converter
          </h2>
          <h3 className="text-xl text-zinc-500">
            Quickly convert your images from one format to another.
          </h3>
          <Card className="w-full flex flex-col gap-2 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Upload your image
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-500">
                Only PNG, JPG & WEBP are supported.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <Dropzone
                onDrop={handleDrop}
                onDelete={handleOnDelete}
                onDragOver={handleDragOver}
                onChange={handleFileChange}
                uploadedImage={selectedImage}
              />
              <div className="flex flex-col justify-start gap-2">
                <Label htmlFor="format">Target Format</Label>
                <Select
                  value={format}
                  disabled={selectedImage === null}
                  onValueChange={(value) => setFormat(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats
                      .filter(({ value }) => value !== extension)
                      .map(({ name, value }) => (
                        <SelectItem
                          key={name}
                          value={value}
                          className={spaceFont}
                        >
                          {name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            {selectedImage && <Separator orientation="horizontal" />}
            {selectedImage && (
              <CardFooter className="flex flex-row justify-end">
                <Button onClick={onConvert}>Convert</Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
