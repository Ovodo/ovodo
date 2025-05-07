import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import ProjectsSection from "@/components/ProjectsSection";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-0">
      <Hero2 />
      <div className="flex flex-col gap-0 w-full max-w-[1440px] mx-auto">
        <div className="w-full py-12 md:py-20">
          <About />
        </div>
        <div className="w-full py-12 md:py-20">
          <Skills />
        </div>
        <div className="w-full py-12 md:py-20">
          <ProjectsSection />
        </div>
        <div className="w-full py-12 md:py-20">
          <Services />
        </div>
        <div className="w-full py-12 md:py-20">
          <Testimonials />
        </div>
        <div className="w-full py-12 md:py-20">
          <Contact />
        </div>
        <Footer />
      </div>
      {/* <Music /> */}
    </div>
  );
}
