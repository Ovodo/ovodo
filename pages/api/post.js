// posts.js

import clientPromise from "../../lib/mongodb";

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db("Database");
//   switch (req.method) {
//     case "POST":
//       let bodyObject = JSON.parse(req.body);
//       let myPost = await db.collection("samplepacks").insertOne(bodyObject);
//       res.json(myPost.ops[0]);
//       break;
//     case "GET":
//       const allPosts = await db.collection("samplepacks").find({});

//       return { props: allPosts };
//       //   res.json({ status: 200, data: allPosts });
//       break;
//   }
// }
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Database");

    const packs = await db
      .collection("samplepacks")
      .find({})
      // .sort({ metacritic: -1 })
      // .limit(20)
      .toArray();

    res.status(200).json({ packs });
  } catch (e) {
    console.error("this is the error", e);
  }
}
