import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, fullName, kindeId, picture, role } = await request.json();
  try {
    if (!fullName || !email || kindeId || picture) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const user = await User.create({
      fullName,
      email,
      kindeId,
      picture,
      role: "student",
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
