"use client";
import HeaderText from "@/components/cv/HeaderText";
import JobBox from "@/components/cv/JobBox";
import TopSection from "@/components/cv/TopSection";
import { resume } from "@/lib/data";
import { Experience } from "@/types";
import { div } from "framer-motion/client";
import { Rubik } from "next/font/google";

const jobs: Experience[] = resume.experience;

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
  style: ["normal"],
});

const CV = () => {
  return (
    <div
      style={rubik.style}
      className='bg-white p-[2vw] w-[794px] h-[1123px] mx-auto text-res_primary'
    >
      <TopSection />
      <div className='grid mt-[7vh] gap-20 grid-cols-[1.8fr,1fr]'>
        {/* column 1 */}
        <div>
          <HeaderText title='Experience' />
          <div className='flex flex-col gap-6'>
            {jobs.map((item, index) => {
              return <JobBox key={index.toString()} job={item} />;
            })}
          </div>
        </div>
        {/* column 2 */}
        <div className='flex flex-col gap-6'>
          <div>
            <HeaderText title='Summary' />
            <p className=''>{resume.summary}</p>
          </div>

          <div>
            <HeaderText title='Certification' />
            <div className='flex flex-col gap-1'>
              {resume.certifications.map((item, index) => (
                <JobBox key={index.toString()} job={item} />
              ))}
            </div>
          </div>
          <div>
            <HeaderText title='Skills' />
            <div className='flex flex-wrap gap-2'>
              {resume.skills.map((item) => (
                <p
                  key={item}
                  className='border-b font-medium border-b-res_primary/70 p-2'
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <HeaderText title='Projects' />
            <div className='flex flex-col mt-6 gap-6'>
              {resume.projects.map((item, index) => (
                <JobBox key={index.toString()} job={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
