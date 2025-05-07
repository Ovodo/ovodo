"use client";
import BlogBox from "@/components/BlogBox";

// Dummy data for demonstration. Replace with real data fetching.
// const blogTopics = [
//   {
//     id: 1,
//     image: "/public/globe.svg",
//     title: "Welcome to the Ovodo Blog",
//     body: `This is a sample blog post. You can add images, code, and more!`,
//     images: ["/public/graph.png"],
//     comments: [{ name: "Jane Doe", handle: "@jane", text: "Great post!" }],
//   },
//   // Add more topics as needed
// ];

export default function BlogPage() {
  return (
    <div>
      <BlogBox />
    </div>
  );
}
