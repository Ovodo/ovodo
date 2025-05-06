"use client";

import Image from "next/image";

const blogTopics = [
  {
    id: 1,
    image: "/globe.svg", // Remove /public, Next.js serves from /public root
    title: "Welcome to the Ovodo Blog",
    body: `This is a sample blog post. You can add images, code, and more!`,
    images: ["/graph.png"],
    comments: [{ name: "Jane Doe", handle: "@jane", text: "Great post!" }],
    reads: 123, // Example read count
    date: "2025-04-30", // Example date
  },
  // Add more topics as needed
];

const BlogBox = () => {
  return (
    <div>
      {blogTopics.map((topic) => (
        <div
          key={topic.id}
          className="border border-gray-200 rounded-xl mb-8 overflow-hidden shadow-sm bg-white max-w-full mx-auto mt-8"
        >
          <div className="w-full h-[250px] relative">
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-fit"
              priority
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl text-night font-semibold mb-2">
              {topic.title}
            </h2>
            <p className="text-gray-600 mb-4">{topic.body}</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <span>📖 {topic.reads} reads</span>
              <span>📅 {new Date(topic.date).toLocaleDateString()}</span>
              <span>💬 {topic.comments.length} comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogBox;
