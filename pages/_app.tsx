import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

import { interFont } from "@/lib/fonts";
import Heading from "@/components/sections/Heading";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={interFont}>
      <Heading />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Toaster richColors closeButton />
    </div>
  );
}
