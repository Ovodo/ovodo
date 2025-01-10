import DevProjects from "@/components/DevProjects";
// import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className='min-h-screen  h-[150vh]'>
      <Hero2 />
      <Skills />
      <DevProjects />
    </div>
  );
}
