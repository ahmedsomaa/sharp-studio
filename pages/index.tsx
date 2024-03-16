import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import { spaceFont } from "@/lib/fonts";

export default function Landing() {
  return (
    <div className={spaceFont}>
      <Heading />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
