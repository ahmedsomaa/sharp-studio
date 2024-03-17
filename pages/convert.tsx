import { toast } from "sonner";
import { RepeatIcon } from "lucide-react";
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
import { toBase64 } from "@/lib/files";
import { interFont } from "@/lib/fonts";
import Dropzone from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supportedFormats } from "@/lib/formats";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

type Base64 = string;
type Options = {
  format: string;
  quality: number;
};

export default function Converter() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [options, setOptions] = useState<Options>({ format: "", quality: 80 });
  const [convertedImage, setConvertedImage] = useState<Base64 | null>(null);

  const imgExt = useMemo(
    () =>
      ["jpeg", "jpg"].includes(selectedImage?.type.split("/")[1] as string)
        ? "jpeg"
        : selectedImage?.type.split("/")[1],
    [selectedImage]
  );

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

  const handleOnDelete = () => onClickNew();

  const onClickNew = () => {
    setSelectedImage(null);
    setConvertedImage(null);
    setOptions({ format: "", quality: 80 });
  };

  const onConvert = async () => {
    try {
      setLoading(true);
      const img = await toBase64(selectedImage as File);
      const req = await fetch("/api/convert", {
        method: "POST",
        body: JSON.stringify({
          options,
          image: { base64: img, type: selectedImage?.type },
        }),
      });
      if (req.status === 413) {
        throw new Error("Image size exceeded 1MB");
      }
      const res = await req.json();
      setLoading(false);
      setConvertedImage(res.data.img);
      toast.success("Conversion Succeeded", {
        description: `SharpStudio successfully converted your image to ${options.format.toUpperCase()}`,
      });
    } catch (error) {
      setLoading(false);
      const cause = (error as Error).message;
      toast.error("Conversion Failed", {
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
              <RepeatIcon size={32} className="mr-2" />
              Convert
            </p>
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
                <h4 className="text-xl font-bold">Conversion Options</h4>
                <div className="space-y-1">
                  <Label htmlFor="format">Convert to</Label>
                  <Select
                    value={options.format}
                    disabled={selectedImage === null}
                    onValueChange={(value) =>
                      setOptions((prev) => ({ ...prev, format: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedFormats
                        .filter(({ extension }) => extension !== imgExt)
                        .map(({ name, extension }) => (
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
                <div className="space-y-1">
                  <Label htmlFor="quality">Quality</Label>
                  <Slider
                    min={1}
                    step={1}
                    max={100}
                    value={[options.quality]}
                    disabled={!selectedImage}
                    onValueChange={([value]) =>
                      setOptions((prev) => ({ ...prev, quality: value }))
                    }
                  />
                </div>
              </div>
            </CardContent>
            {selectedImage && <Separator orientation="horizontal" />}
            {selectedImage && (
              <CardFooter className="flex flex-row justify-end">
                {convertedImage ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onClickNew}>
                      New
                    </Button>
                    <a href={convertedImage} download>
                      <Button>Download</Button>
                    </a>
                  </div>
                ) : (
                  <Button
                    onClick={onConvert}
                    disabled={loading || !options.format}
                  >
                    {loading ? "Converting..." : "Convert"}
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
