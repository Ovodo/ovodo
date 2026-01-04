import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import ProjectsSection from "@/components/ProjectsSection";
import Services from "@/components/Services";
// import Reveal from "@/components/Reveal";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen h-full scrollbar-hide  flex flex-col gap-0">
      <Hero2 />
      <div className="w-full    section-animate">
        <About />
      </div>
      <div className="w-full     section-animate">
        <Skills />
      </div>
      <div className="w-full  mt-[10%]  ">
        <ProjectsSection />
      </div>
      <div className="w-full mt-[150px] lg:mt-0  max-h-max  ">
        <Services />
      </div>
      <div className="w-full   section-animate">
        <Testimonials />
      </div>
      <div className="w-full   section-animate">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
