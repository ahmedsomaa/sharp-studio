import { Inter, Space_Grotesk } from "next/font/google";

const paragraph = Inter({
  subsets: ["latin"],
  display: "swap",
});

const heading = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const spaceFont = heading.className;
export const interFont = paragraph.className;
