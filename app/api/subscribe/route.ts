import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { ok: false, message: "Please provide a valid email." },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("ovd");
        const collection = db.collection("blog_subscribers");

        const result = await collection.updateOne(
            { email },
            { $setOnInsert: { email, createdAt: new Date() } },
            { upsert: true }
        );

        const alreadySubscribed = result.upsertedCount === 0;

        return NextResponse.json(
            {
                ok: true,
                message: alreadySubscribed
                    ? "You are already subscribed."
                    : "Thanks for subscribing!",
            },
            { status: alreadySubscribed ? 200 : 201 }
        );
    } catch (error) {
        console.error("Subscribe API error", error);
        return NextResponse.json(
            { ok: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
