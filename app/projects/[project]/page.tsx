import Link from "next/link";
import { resume } from "../../lib/data";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";

type Params = Promise<{ project: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const p = await params;
  const projectName = decodeURIComponent(p.project);
  const project = resume.projects.find((item) => item.company == projectName);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you're looking for doesn't exist.",
    };
  }
  const extraKeywords = [
    "web3",
    "blockchain",
    "dapp",
    "decentralized",
    "smart contracts",
    "solidity",
    "rust",
    "move",
    "sui",
    "aptos",
    "ethereum",
    "nft",
    "defi",
    "full stack",
    "full-stack",
    "next.js",
    "react",
    "typescript",
    "node.js",
    "node",
    "tailwind",
    "mongodb",
    "postgresql",
    "docker",
    "ci/cd",
  ];

  const mergedKeywords = Array.from(
    new Set([...(project.keywords ?? []), ...extraKeywords]),
  ).slice(0, 50);

  const ogImage =
    project.images && project.images.length > 0
      ? `https://ovd.dev${project.images[0].src}`
      : project.image
        ? `https://ovd.dev${project.image}`
        : `https://ovd.dev/og/re-og.webp`;

  return {
    title: `${project.company} — ${project.title || "Project"}`,
    description: project.summary || project.achievements?.[0] || undefined,
    keywords: mergedKeywords,
    alternates: {
      canonical: `https://ovd.dev/projects/${encodeURIComponent(project.company)}`,
    },
    authors: [
      {
        name: resume.personalInfo.name,
        url: resume.personalInfo.website,
      },
    ],
    applicationName: "Ovodo — Portfolio",
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    openGraph: {
      title: project.company,
      description: project.summary || undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.images?.[0]?.title || project.company,
        },
      ],
      type: "website",
      url: `https://ovd.dev/projects/${encodeURIComponent(project.company)}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.company,
      description: project.summary || undefined,
      images: [ogImage],
    },
  };
}

const bgGradient =
  "bg-gradient-to-br from-black/70 from-5%  via-transparent via-80%  to-cyan-950/60";

const Page = async (props: { params: Params }) => {
  // --------------------------------------------VARIABLES
  const params = await props.params;
  const projectName = decodeURIComponent(params.project);

  const project = resume.projects.find((item) => item.company == projectName);

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className=" absolute top-0 overflow-y-auto left-0 w-full flex flex-col h-screen">
      <video
        className="w-full absolute h-full object-cover"
        autoPlay
        loop
        playsInline
      >
        <source src={project?.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Gradient Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full ${bgGradient} `}
      ></div>

      {/* Content Above Video */}
      <section
        className="overflow-y-scroll h-screen w-full absolute"
        data-lenis-prevent
      >
        <div className="min-h-[300vh] gap-40 py-[15vh] z-20 px-[20px] sm:px-[40px] md:px-[60px] bg-red-200/5 flex flex-col  w-full">
          <div
            id="details"
            className="flex flex-col gap-4 w-[60%] rounded-md p-3 h-full bg-slate-500/50 backdrop-blur-lg"
          >
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl  text-primary w-[15%] ">Name - </p>
              <h1 className="text-xl flex-1 text-start ">{project?.company}</h1>
            </div>
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl  min-w-[15%]   text-primary">Summary - </p>
              <p className="text-sm ">{project?.summary}</p>
            </div>
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl text-primary w-[15%] ">Repository - </p>
              <Link
                target="_blank"
                href={project?.repo ?? ""}
                className="text-xl text-cyan-300 hover:underline"
              >
                {project?.repo}
              </Link>
            </div>
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl text-primary w-[15%] ">Languages - </p>
              <div className="flex gap-3 items-center">
                {project?.languages?.map((item) => (
                  <div key={item} className="flex gap-1 items-center">
                    <div
                      className={`w-2 h-2 animate-pulse rounded-full ${
                        item.toLowerCase().includes("typescript")
                          ? "bg-[#31D1F1]"
                          : item.toLowerCase().includes("idity")
                            ? "bg-stone-200"
                            : item.toLowerCase().includes("javascript")
                              ? "bg-yellow-300"
                              : item.toLowerCase().includes("rust")
                                ? "bg-pink-200"
                                : "bg-violet-300"
                      }`}
                    />
                    <p className="text-xs text-res_primary capitalize">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl text-primary w-[15%] ">Keywords - </p>
              <div className="flex">
                {project?.keywords?.map((item, index, array) => {
                  return (
                    <p key={item} className="text-green-300 mr-1">
                      {index == array.length - 1 ? `${item}` : `${item}, `}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex h-max border-b border-primary/20 py-2 border-dashed  gap-2 items-center">
              <p className="text-xl text-primary w-[15%] ">Category - </p>
              <ul className=" flex gap-1">
                {project?.category?.map((item, index) => {
                  return (
                    <li
                      className="text-[10px] text-orange-300 md:text-xs"
                      key={index.toString()}
                    >
                      <ReactMarkdown>{`#${item}`}</ReactMarkdown>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {project?.images?.map((item, index) => (
            <div
              key={index.toString()}
              className="w-full flex flex-col gap-4 my-8 h-max"
            >
              <div className="w-[450px] hover:rounded-xl  hover:w-[900px] hover:h-[500px] duration-300 ease-in h-[300px] relative">
                <Image
                  fill
                  src={item.src}
                  alt={project.title}
                  className="object-contain hover:cursor-pointer  transition-transform  "
                />
              </div>
              <div className={`flex items-end w-[450px] justify-between`}>
                <p className="text-2xl font-medium">{item.title}</p>
                <div
                  className={`text-2xl rounded-full w-10 h-10 flex items-center ${bgGradient} justify-center bg-primary text-black font-bold`}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* <div className=" z-10 absolute flex flex-col items-center overflow-y-scroll justify-center w-full h-screen  text-primary ">
      </div> */}
    </div>
  );
};
export default Page;
