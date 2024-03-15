import Hero from "@/components/Hero";
import { spaceFont } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";

export default function Landing() {
  return (
    <div className={spaceFont}>
      <Heading />
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-20">
        <main className="min-h-screen flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <Navbar />
            <Hero />
          </div>
        </main>
        <Footer iconColor="text-primary hover:text-primary/80" />
      </div>
    </div>
  );
}
