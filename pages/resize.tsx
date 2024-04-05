import { toast } from "sonner";
import React, { useState } from "react";
import { ScalingIcon } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { toBase64 } from "@/lib/files";
import Dropzone from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { resizeImageFitOptions } from "@/lib/formats";
import { interFont } from "@/lib/fonts";

type Base64 = string;
type ImageFit = "cover" | "contain" | "fill" | "inside" | "outside";
type Dimension = {
  width: string;
  height: string;
};

type ResizeOptions = {
  dimensions: Dimension;
  fit: ImageFit;
};

export default function Resizer() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ResizeOptions>({
    dimensions: { height: "", width: "" },
    fit: "cover",
  });
  const [resizedImage, setResizedImage] = useState<Base64 | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
    setResizedImage(null);
    setSelectedImage(null);
    setOptions({ dimensions: { height: "", width: "" }, fit: "cover" });
  };

  const onResize = async () => {
    try {
      setLoading(true);
      const img = await toBase64(selectedImage as File);
      const req = await fetch("/api/resize", {
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
      setResizedImage(res.data.img);
      toast.success("Resize Succeeded", {
        description: `SharpStudio successfully resized your image to ${options.dimensions.height}x${options.dimensions.width}`,
      });
    } catch (error) {
      setLoading(false);
      const cause = (error as Error).message;
      toast.error("Resize Failed", {
        description: cause,
      });
    }
  };

  return (
    <div className="md:mb-40 mb-[500px]">
      <section className="relative h-[350px] w-full px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex h-full max-w-screen-md	 mx-auto w-full flex-col items-center gap-5">
          <h2 className="sm:text-4xl/ text-3xl max-w-[708px] font-bold text-slate-900">
            <p className="flex flex-row items-center">
              <ScalingIcon size={32} className="mr-2" />
              Resize
            </p>
          </h2>
          <h3 className="text-xl text-zinc-500">
            Quickly change the dimensions of your images.
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
                <h4 className="text-xl font-bold">Resize Options</h4>
                <div>
                  <Label htmlFor="height">New Height</Label>
                  <Input
                    id="height"
                    type="text"
                    name="height"
                    inputMode="numeric"
                    disabled={!selectedImage}
                    value={options.dimensions.height}
                    placeholder="Enter new height..."
                    onChange={({ target }) =>
                      setOptions((prev) => ({
                        ...prev,
                        dimensions: {
                          ...prev.dimensions,
                          height: target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">New Width</Label>
                  <Input
                    id="width"
                    type="text"
                    name="width"
                    inputMode="numeric"
                    value={options.dimensions.width}
                    disabled={!selectedImage}
                    placeholder="Enter new width..."
                    onChange={({ target }) =>
                      setOptions((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, width: target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fit">Image Fit</Label>
                  <Select
                    value={options.fit}
                    disabled={selectedImage === null}
                    onValueChange={(value) =>
                      setOptions((prev) => ({
                        ...prev,
                        fit: value as ImageFit,
                      }))
                    }
                  >
                    <SelectTrigger id="fit" className="w-full">
                      <SelectValue placeholder="Select a fit" />
                    </SelectTrigger>
                    <SelectContent>
                      {resizeImageFitOptions.map(({ name, value }) => (
                        <SelectItem
                          key={name}
                          value={value}
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
                {resizedImage ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onClickNew}>
                      New
                    </Button>
                    <a href={resizedImage} download>
                      <Button>Download</Button>
                    </a>
                  </div>
                ) : (
                  <Button
                    disabled={
                      loading ||
                      !(
                        options.dimensions.height &&
                        options.dimensions.width &&
                        options.fit
                      )
                    }
                    onClick={onResize}
                  >
                    {loading ? "Resizing..." : "Resize"}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
