"use client";
import { IconSparkles } from "@tabler/icons-react";
import { resume } from "@/app/lib/data";

const Services = () => {
  // Animation variants must be serializable objects, not functions
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 40 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.7, type: "spring", bounce: 0.3 },
  //   },
  //   hover: {
  //     scale: 1.04,
  //     boxShadow: "0 4px 32px 0 rgba(79,178,134,0.15)",
  //     transition: { duration: 0.3 },
  //   },
  // };

  return (
    <div id="services" className="flex flex-col gap-5 lg:gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-xl sm:text-2xl leading-[1.1] sm:leading-none font-bold flex items-center gap-2">
          <IconSparkles className="text-mint animate-pulse" size={28} />
          Services
        </h3>
        <p className="text-primary text-sm sm:text-[16px] md:text-[20px] leading-tight font-light ">
          I provide expert solutions tailored to your needs across the following
          categories.
        </p>
      </div>
      <div className="flex gap-5 flex-col flex-wrap">
        {resume.services.map((item) => (
          <div
            key={item.title}
            className="relative flex px-5 gap-2 border-b-[1px] border-primary/20 items-center bg-[#152821] card overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="rounded-full min-w-2 h-2 bg-mint animate-pulse" />
            <div className="flex flex-col min-w-[30%] lg:min-w-[250px]">
              <p className="text-primary py-4 text-sm sm:text-[16px] md:text-[20px] leading-tight font-semibold max-w-[620px] flex items-center gap-2">
                <IconSparkles className="text-mint" size={18} />
                {item.title}
              </p>
              <p className="text-primary py-2 border-l-[1px] border-l-slate-50/20 px-4 ml-4 text-xs sm:text-[16px] leading-tight font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Services;
