import { useEffect, useMemo, useState } from "react";
import { Experience } from "../types";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";

// Define a type for gallery items
interface GalleryItem {
  type: "image" | "video";
  src: string;
  title?: string;
}

const ProjectCard = ({
  project,
  featured,
}: {
  project: Experience;
  featured?: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    if (!project.video) return;
    const videoEl = document.createElement("video");
    const ext = project.video.split(".").pop()?.toLowerCase();
    const mime = ext === "mp4" ? "video/mp4" : "video/webm";
    const supports = videoEl.canPlayType?.(mime) ?? "";
    const saveData =
      typeof navigator !== "undefined" &&
      // @ts-expect-error modern browsers expose connection
      navigator.connection?.saveData;
    setCanPlayVideo(
      (supports === "maybe" || supports === "probably") && !saveData
    );
  }, [project.video]);

  // Compose gallery: include video only when the device can play it (mobile Safari often cannot play webm)
  const gallery: GalleryItem[] = useMemo(() => {
    const items: GalleryItem[] = [];
    if (project.video && canPlayVideo) {
      items.push({ type: "video", src: project.video });
    }
    if (Array.isArray(project.images)) {
      items.push(
        ...(project.images as { src: string; title?: string }[]).map((img) => ({
          type: "image" as const,
          src: img.src,
          title: img.title,
        }))
      );
    } else if (project.image) {
      items.push({
        type: "image" as const,
        src: project.image,
        title: project.company,
      });
    }
    return items;
  }, [
    canPlayVideo,
    project.company,
    project.image,
    project.images,
    project.video,
  ]);

  const hero = gallery[0];

  const images = useMemo(() => {
    if (!Array.isArray(project.images))
      return [] as { src: string; title?: string }[];
    return project.images as { src: string; title?: string }[];
  }, [project.images]);

  const poster = project.image || images[0]?.src;

  useEffect(() => {
    setHeroLoaded(!hero);
  }, [hero]);
  // const openModal = (idx: number) => {
  //   setModalIdx(idx);
  //   setModalOpen(true);
  // };
  const closeModal = () => setModalOpen(false);
  const next = () => setModalIdx((i) => (i + 1) % gallery.length);
  const prev = () =>
    setModalIdx((i) => (i - 1 + gallery.length) % gallery.length);
  return (
    <div
      className={`flex gap-1 relative w-full lg:w-[22%] h-[400px] bg-[#152821] rounded-lg p-1 flex-col shadow-md transition-transform duration-200 ${
        featured ? "ring-2 ring-primary/80 scale-105" : "hover:scale-105"
      }`}
    >
      {featured && (
        <span className="absolute top-2 left-2 bg-primary text-night text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
          Featured
        </span>
      )}
      {/* Main preview: video or image, clickable for modal */}
      {hero && (
        <Link
          href={`/projects/${project.company}`}
          className="cursor-pointer relative w-full h-[191px]"
        >
          {!heroLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/25 backdrop-blur-sm">
              <div className="h-12 w-12 rounded-full border-2 border-accent/70 border-t-transparent animate-spin shadow-[0_0_30px_rgba(255,212,0,0.35)]" />
            </div>
          )}
          {hero.type === "video" ? (
            <video
              src={hero.src}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={poster}
              onLoadedData={() => setHeroLoaded(true)}
              onError={() => setHeroLoaded(true)}
              className="w-full h-[191px] rounded-lg object-cover border-[0.5px] border-opacity-20 border-orange-100 hover:scale-[1.02] transition-transform duration-500 ease-in-out"
            />
          ) : (
            <Image
              src={hero.src}
              alt={hero.title || project.company}
              fill
              onLoad={() => setHeroLoaded(true)}
              className="object-cover border-[0.5px] border-opacity-20 border-orange-100 rounded-lg hover:scale-[1.02] transition-transform duration-500 ease-in-out"
            />
          )}
        </Link>
      )}
      <div className="flex px-1 flex-1 flex-col justify-around">
        <h6 className="font-semibold text-lg text-res_secondary">
          {project.company}
        </h6>
        <div className="flex gap-1 flex-wrap mt-1">
          {project?.languages?.map((item) => (
            <span
              key={item}
              className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full mr-1 mb-1"
            >
              {item}
            </span>
          ))}
        </div>
        <ul className="flex gap-1 flex-wrap mt-1">
          {project?.category?.map((item, index) => (
            <li
              className="text-[10px] bg-night/30 px-2 py-0.5 rounded-full"
              key={index.toString()}
            >
              <ReactMarkdown>{`#${item}`}</ReactMarkdown>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-xs text-primary font-light line-clamp-3">
          {(project.summary && project.summary) ?? project.achievements[0]}
        </div>
      </div>
      <div className="flex gap-2 ml-auto px-1 my-2">
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            className="bg-primary text-night px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 hover:scale-110 duration-150"
            title="Live Demo"
          >
            <IconWorld size={16} /> Live
          </Link>
        )}
        {project.repo && (
          <Link
            href={project.repo}
            target="_blank"
            className="bg-night text-primary px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 border border-primary hover:scale-110 duration-150"
            title="GitHub Repo"
          >
            <IconBrandGithub size={16} /> Code
          </Link>
        )}
      </div>
      {/* Modal Gallery */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative bg-night rounded-lg p-4 max-w-2xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-primary text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="text-primary text-2xl font-bold"
              >
                &#8592;
              </button>
              {gallery[modalIdx]?.type === "video" ? (
                <video
                  src={gallery[modalIdx].src}
                  controls
                  autoPlay
                  loop
                  className="max-h-[60vh] max-w-[60vw] rounded-lg"
                />
              ) : (
                <Image
                  src={gallery[modalIdx].src}
                  alt={gallery[modalIdx].title || "Project image"}
                  width={600}
                  height={400}
                  className="rounded-lg max-h-[60vh] object-contain"
                />
              )}
              <button
                onClick={next}
                className="text-primary text-2xl font-bold"
              >
                &#8594;
              </button>
            </div>
            {gallery[modalIdx]?.title && (
              <div className="text-primary text-center mt-2 text-sm">
                {gallery[modalIdx].title}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
