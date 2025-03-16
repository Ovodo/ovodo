import Contact from "@/components/Contact";
import DevProjects from "@/components/DevProjects";
import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Services from "@/components/Services";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen  h-[150vh]">
      <Hero2 />
      <Skills />
      <DevProjects />
      <Services />
      <Contact />
      <Footer />
      {/* <Music /> */}
    </div>
  );
}
