import { resume } from "@/app/lib/data";

const Services = () => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <section id="services" className="flex flex-col gap-5 lg:gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-xl sm:text-2xl    leading-[1.1] sm:leading-none font-bold">
          Services
        </h3>
        {/* <p className="text-primary text-sm  sm:text-[16px]  md:text-[20px] leading-tight font-light ">
          I provide expert solutions tailored to your needs across the following
          categories.
        </p> */}
      </div>
      <div className="flex gap-5  flex-col flex-wrap">
        {resume.services.map((item) => (
          <div
            key={item.title}
            className="flex gap-2 border-b-[1px] border-primary/20  items-center"
          >
            <div className="rounded-full min-w-2 h-2 bg-mint animate-pulse" />
            <p className="text-primary py-4 min-w-[30%] lg:min-w-[250px] text-sm  sm:text-[16px]  md:text-[20px] leading-tight font-light max-w-[620px]">
              {item.title}
            </p>{" "}
            <p className="text-primary py-4 border-l-[1px] border-l-slate-50/20 px-4 ml-10 text-xs  sm:text-[16px]  leading-tight font-light">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;
