import { ShrinkIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import Dropzone from "@/components/Dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toBase64 } from "@/lib/files";
import { interFont } from "@/lib/fonts";

type Base64 = string;

export default function Compressor() {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<Base64 | null>(null);

  // --- handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImage) return;
    const file = event.target.files && event.target.files[0];

    if (file && file.size > 4.5e6) {
      toast.error("File Upload Failed", {
        description: "Maximum file size exceeded",
      });
      return;
    }

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
    if (file.size > 4.5e6) {
      toast.error("File Upload Failed", {
        description: "Maximum file size exceeded",
      });
      return;
    }
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleOnDelete = () => onReset();

  const onReset = () => {
    setFormat("");
    setSelectedImage(null);
    setCompressedImage(null);
  };

  const onCompress = async () => {
    try {
      setLoading(true);
      const img = await toBase64(selectedImage as File);
      const req = await fetch("/api/compress", {
        method: "POST",
        body: JSON.stringify({
          format,
          image: { base64: img, type: selectedImage?.type },
        }),
      });
      if (req.status === 413) {
        throw new Error("Image size exceeded 1MB");
      }
      if (!req.ok) {
        throw new Error("Failed to compress image");
      }
      const res = await req.json();
      setLoading(false);
      setCompressedImage(res.data.img);
      const percentage =
        (Number(selectedImage?.size) - res.data.size) /
        Number(selectedImage?.size);
      toast.success("Compression Succeeded", {
        description: `SharpStudio just saved you ${Math.abs(
          percentage * 100,
        ).toFixed(0)}%`,
      });
    } catch (error) {
      setLoading(false);
      const cause = (error as Error).message;
      toast.error("Compression Failed", {
        description: cause,
      });
    }
  };

  return (
    <div className="md:mb-40 mb-[500px]">
      <div className="relative h-[350px] w-full px-4 md:h-[603px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex h-full max-w-screen-md	 mx-auto w-full flex-col items-center gap-5">
          <h2 className="sm:text-4xl/ text-3xl max-w-[708px] font-bold text-slate-900">
            <p className="flex flex-row items-center">
              <ShrinkIcon size={32} className="mr-2" />
              Compress
            </p>
          </h2>
          <h3 className="text-xl text-zinc-500">
            Quickly compress your images for faster websites.
          </h3>
          <Card className="w-full flex flex-col gap-2 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Upload your image
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-500">
                Only PNG, JPG, JPEG and WEBP are supported with maximum size of
                4.5MB.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <Dropzone
                onDrop={handleDrop}
                onDelete={handleOnDelete}
                onDragOver={handleDragOver}
                onChange={handleFileChange}
                uploadedImage={selectedImage}
              />
              <div className="flex flex-col justify-start gap-3">
                <h4 className="text-xl font-bold">Compression Options</h4>
                <div className="space-y-1">
                  <Label htmlFor="format">Compress to</Label>
                  <Select
                    value={format}
                    disabled={selectedImage === null}
                    onValueChange={(value) => setFormat(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { name: "AVIF", extension: "avif" },
                        { name: "WEBP", extension: "webp" },
                      ].map(({ name, extension }) => (
                        <SelectItem
                          key={name}
                          value={extension}
                          className={interFont}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            {selectedImage && <Separator orientation="horizontal" />}
            {selectedImage && (
              <CardFooter className="flex flex-row justify-end">
                {compressedImage ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onReset}>
                      New
                    </Button>
                    <a href={compressedImage} download>
                      <Button>Download</Button>
                    </a>
                  </div>
                ) : (
                  <Button disabled={loading || !format} onClick={onCompress}>
                    {loading ? "Compressing..." : "Compress"}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
