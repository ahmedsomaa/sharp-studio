import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { interFont } from "@/lib/fonts";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Heading from "@/components/sections/Heading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={interFont}>
      <Heading />
      <div className="flex flex-col gap-20">
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </div>
      <Toaster richColors closeButton />
    </div>
  );
}
