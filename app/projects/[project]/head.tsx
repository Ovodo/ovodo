import React from "react";
import { resume } from "../../lib/data";

export default function Head({ params }: { params: { project: string } }) {
  const projectName = decodeURIComponent(params.project);
  const project = resume.projects.find((p) => p.company === projectName);

  if (!project) return null;

  const url = `https://ovd.dev/projects/${encodeURIComponent(project.company)}`;
  const image =
    project.images && project.images.length > 0
      ? `https://ovd.dev${project.images[0].src}`
      : `https://ovd.dev/og/re-og.webp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.company,
    description: project.summary || project.achievements?.[0] || "",
    url,
    image,
    keywords: (project.keywords || []).concat([
      "web3",
      "blockchain",
      "dapp",
      "smart contracts",
      "decentralized",
      "defi",
      "nft",
      "full stack",
      "next.js",
      "react",
      "typescript",
    ]),
    author: {
      "@type": "Person",
      name: resume.personalInfo.name,
      url: resume.personalInfo.website,
    },
    provider: {
      "@type": "Organization",
      name: resume.personalInfo.name,
      url: resume.personalInfo.website,
    },
  };

  return (
    <>
      <link rel="canonical" href={url} />
      <meta name="author" content={resume.personalInfo.name} />
      <meta name="publisher" content={resume.personalInfo.name} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta
        name="keywords"
        content={(project.keywords || [])
          .concat(["web3", "blockchain", "full-stack"])
          .join(", ")}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
