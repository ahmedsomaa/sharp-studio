import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

import { spaceFont } from "@/lib/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Heading from "@/components/Heading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={spaceFont}>
      <Heading />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Toaster richColors closeButton />
    </div>
  );
}
