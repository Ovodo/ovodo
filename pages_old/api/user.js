import clientPromise from "@/lib/mongodb";

export default async function (req, res) {
  const { gmail, username, password, bearer } = req.body;

  //   const body = req.body;
  //   console.log(req.body);

  //   res.status(200).json(req.body);

  try {
    const client = await clientPromise;
    const db = client.db("Users");

    await db.collection("Details").insertOne(req.body);
    // console.log(users);
    // .sort({ metacritic: -1 })
    // .limit(20)
    //   .toArray();
    // client.close();

    res.status(200).json({ msg: "Data inserted successfully" });
  } catch (e) {
    console.error("Insert Error:", e);
  }
}

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };
