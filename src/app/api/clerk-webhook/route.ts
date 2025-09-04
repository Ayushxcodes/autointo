import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      email_addresses,
      first_name,
      image_url,
      primary_email_address_id,
    } = body?.data;

    // Find the primary email from the list Clerk sends
    const primaryEmailObj = email_addresses?.find(
      (e: any) => e.id === primary_email_address_id
    );

    const email = primaryEmailObj?.email_address || null;

    console.log("✅ Clerk webhook received:", {
      id,
      email,
      first_name,
      image_url,
    });

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email: email ?? "",
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email: email ?? "", // fallback empty string if Clerk sends no email
        name: first_name || "",
        profileImage: image_url || "",
      },
    });

    return new NextResponse("User updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
