"use server";

import clientPromise from "@/lib/mongodb";

interface WaitlistData {
    email: string;
    userType: "creative" | "collector";
    creativeField?: string;
    portfolioLink?: string;
    socialLinks?: {
        twitter: string;
        instagram: string;
        website: string;
    };
    platforms: string[];
    interests: string[];
}

export async function submitWaitlist(data: WaitlistData) {
    try {
        const {
            email,
            userType,
            creativeField,
            portfolioLink,
            socialLinks,
            platforms,
            interests,
        } = data;

        // Validate data
        if (!email || !email.includes("@")) {
            return { success: false, error: "Invalid email address" };
        }

        if (!userType) {
            return { success: false, error: "Please select user type" };
        }

        if (!platforms || platforms.length === 0) {
            return { success: false, error: "Please select at least one platform" };
        }

        if (!interests || interests.length === 0) {
            return { success: false, error: "Please select at least one interest" };
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("ovd_database");
        const collection = db.collection("waitlist");

        // Check if email already exists
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return {
                success: false,
                error: "You're already on the list! We'll be in touch soon.",
            };
        }

        // Prepare document
        const document: any = {
            email,
            userType,
            platforms,
            interests,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Add creative fields if user is a creative
        if (userType === "creative") {
            if (creativeField) document.creativeField = creativeField;
            if (portfolioLink) document.portfolioLink = portfolioLink;
            if (socialLinks) document.socialLinks = socialLinks;
        }

        // Insert new user
        await collection.insertOne(document);

        return {
            success: true,
            message: "Successfully joined the waitlist!",
        };
    } catch (error) {
        console.error("Error submitting waitlist:", error);
        return {
            success: false,
            error: "Failed to join waitlist. Please try again.",
        };
    }
}
