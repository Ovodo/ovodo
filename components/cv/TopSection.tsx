import { resume } from "@/lib/data";
import {
  IconPhone,
  IconAt,
  IconMapPin,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import { IconBadge4k } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const personal = resume.personalInfo;
const details = [
  // {
  //   image: <IconPhone color='#c4881c' size={16} stroke={2} />,
  //   text: personal.phone,
  // },
  {
    image: <IconAt color="#c4881c" size={16} stroke={2} />,
    text: personal.email,
  },
  {
    image: <IconMapPin color="#c4881c" size={16} stroke={2} />,
    text: personal.location,
  },
  {
    image: <IconBrandLinkedin color="#c4881c" size={16} stroke={2} />,
    text: personal.linkedin,
  },
  {
    image: <IconWorld color="#c4881c" size={16} stroke={2} />,
    text: personal.website,
  },
];
const TopSection = () => {
  return (
    <div className="flex w-full  justify-between flex-row items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-res_primary dark:text-gray-100 font-medium uppercase text-5xl">
          {personal.name}
        </h1>
        <h5 className="text-res_secondary font-medium text-2xl">
          {personal.title}
        </h5>
        <div className="flex gap-x-4 gap-y-2 flex-wrap w-[70%] items-center">
          {details.map((item) => (
            <div key={item.text} className="flex  gap-1 items-center ">
              {item.image}
              {item.text.includes("https") ? (
                <Link
                  href={item.text}
                  className="text-dark_brown dark:text-gray-200 underline font-medium"
                >
                  {item.text}
                </Link>
              ) : (
                <p className="text-res_primary dark:text-gray-200 font-medium">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-[180px] border-2 border-dotted border-opacity-50 border-dark_brown dark:border-gray-500 rounded-full h-[180px] ">
        <Image
          src={"/ovdizzle.jpeg"}
          alt="ovd"
          fill
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default TopSection;
