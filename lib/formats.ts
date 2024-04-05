type ImageFormat = {
  name: string;
  extension: "png" | "jpeg" | "webp";
};

type ImageReizeFit = {
  name: string;
  value: "cover" | "contain" | "fill" | "inside" | "outside";
};

export const supportedFormats: ImageFormat[] = [
  { name: "PNG", extension: "png" },
  { name: "JPG", extension: "jpeg" },
  { name: "WEBP", extension: "webp" },
];

export const resizeImageFitOptions: ImageReizeFit[] = [
  { name: "Cover", value: "cover" },
  { name: "Contain", value: "contain" },
  { name: "Fill", value: "fill" },
  { name: "Inside", value: "inside" },
  { name: "Outside", value: "outside" },
];
