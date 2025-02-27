import { Experience } from "@/types";
import Image from "next/image";
import React from "react";
import {
  IconCalendarMonth,
  IconMap,
  IconMapPin,
  IconLink,
  IconMapPin2,
} from "@tabler/icons-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const JobBox = ({ job }: { job: Experience }) => {
  return (
    <div className='flex gap-3 border-b pb-3 border-dashed border-res_primary/50 flex-row'>
      {job.image && (
        <div className='min-w-[48px] w-[48px] h-[48px]  relative'>
          <Image
            src={job.image}
            alt={job.company}
            fill
            className='object-contain'
          />
        </div>
      )}
      <div className='flex  gap-1 flex-col'>
        <h3 className='text-2xl leading-none text-res_primary'>{job.title}</h3>
        <h6 className='font-semibold text-lg text-res_secondary'>
          {job.company}
        </h6>
        <div className='flex gap-6 items-center'>
          {job.dates && (
            <div className='flex gap-1 items-center'>
              <IconCalendarMonth size={16} stroke={1} />
              <p className='text-xs text-res_primary'>{job.dates}</p>
            </div>
          )}
          {job.location && (
            <div className='flex items-center'>
              <IconMapPin size={16} stroke={1} />
              <p className='text-xs'>{job.location}</p>
            </div>
          )}
        </div>
        {job.link && (
          <div className='flex gap-1 text-dark_brown items-center'>
            <IconLink size={16} stroke={2} />
            <Link
              href={job.link}
              className='text-xs hover:underline text-dark_brown  '
            >
              {job.link}
            </Link>
          </div>
        )}
        <ul className='list-disc flex flex-col gap-1 pl-[2.5%] '>
          {job.achievements.map((item, index) => {
            return (
              <li className='text-sm' key={index.toString()}>
                <ReactMarkdown>{item}</ReactMarkdown>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default JobBox;
