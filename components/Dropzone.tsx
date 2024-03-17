import Image from "next/image";
import { ImageUpIcon, TrashIcon } from "lucide-react";

import { Separator } from "./ui/separator";

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onDelete: () => void;
  uploadedImage: File | null;
}

export default function Dropzone({
  onDrop,
  onChange,
  onDelete,
  onDragOver,
  uploadedImage,
}: DropzoneProps) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="p-8 bg-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary"
    >
      <div className="space-y-4 text-center">
        {uploadedImage ? (
          <div className="flex flex-col gap-3">
            <div className="w-full h-full">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                alt={uploadedImage.name}
                src={URL.createObjectURL(uploadedImage)}
                className="w-full h-full mx-auto rounded-lg"
              />
            </div>
            <Separator orientation="horizontal" className="bg-primary" />
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm">{uploadedImage.name}</p>
              <TrashIcon
                onClick={onDelete}
                className="h-5 w-5 text-red-600 hover:cursor-pointer hover:text-red-600/50"
              />
            </div>
          </div>
        ) : (
          <>
            <ImageUpIcon size={32} className="w-12 h-12 mx-auto text-primary" />
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Drag and drop file here</p>
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer font-medium transition-colors hover:underline group"
              >
                <span className="text-sm underline">or choose a file</span>
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  onChange={onChange}
                  accept="image/png, image/jpg, image/webp, image/jpeg"
                />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
