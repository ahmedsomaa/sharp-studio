type ImageFormat = {
  name: string;
  extension: "png" | "jpeg" | "webp";
};

export const supportedFormats: ImageFormat[] = [
  { name: "PNG", extension: "png" },
  { name: "JPG", extension: "jpeg" },
  { name: "WEBP", extension: "webp" },
];
