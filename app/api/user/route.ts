import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    email,
    fullName,
    id: kindeId,
    picture,
    role,
    bio,
    socialLinks,
    points,
    comments,
  } = await request.json();
  await connectToDatabase();
  try {
    console.log(email, fullName, kindeId, picture, role);
    if (!fullName || !email || !kindeId || !picture) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    // find user if exist
    const isUserExist = await User.findOne({ kindeId });
    console.log("isUserExist", isUserExist);
    if (isUserExist) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 201 }
      );
    }
    const user = await User.create({
      fullName,
      email,
      kindeId,
      picture,
      role: "student",
      bio,
      socialLinks,
      points,
      comments,
    });
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const kindeId = searchParams.get("id");

    if (!kindeId) {
      return NextResponse.json({ message: "Missing Id" }, { status: 401 });
    }

    const user = await User.findOne({ kindeId });

    if (!user) {
      return NextResponse.json({ message: "No User" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User fetched", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting user", error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { bio } = await req.json();
  console.log("patch data", bio);
  try {
    const { searchParams } = new URL(req.url);
    const kindeId = searchParams.get("id");
    const updatedData = await User.findOneAndUpdate(
      { kindeId },
      { bio },
      { new: true }
    );
    return NextResponse.json(
      { message: "User Updated", status: 200, updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user data", error },
      { status: 500 }
    );
  }
}
