// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}



// export async function getServerSideProps() {
//   let res = await fetch("http://localhost:3000/api/post");
//   let allPosts = await res.json();

//   return {
//     props: { allPosts },
//   };
// }

// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db();

//     const movies = await db
//       .collection("samplepacks")
//       .find({})
//       // .sort({ metacritic: -1 })
//       // .limit(20)
//       .toArray();

//     return {
//       props: { allPosts: JSON.parse(JSON.stringify(movies)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
