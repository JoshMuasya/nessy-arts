import CTA from "@/components/Home/CTA";
import Gallery from "@/components/Home/Gallery";
import Hero from "@/components/Home/Hero";
import Process from "@/components/Home/Process";
import Testimonials from "@/components/Home/Testimonials";
import Why from "@/components/Home/Why";


export default function Home() {
  return (
    <div>
      <Hero />
      <Why />
      <Gallery />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
