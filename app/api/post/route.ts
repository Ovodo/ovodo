import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Database");

    const packs = await db.collection("samplepacks").find({}).toArray();

    return NextResponse.json({ packs });
  } catch (e) {
    console.error("Error fetching posts:", e);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Database");

    const body = await request.json();
    const myPost = await db.collection("samplepacks").insertOne(body);

    return NextResponse.json({
      ...body,
      _id: myPost.insertedId,
    });
  } catch (e) {
    console.error("Error creating post:", e);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
