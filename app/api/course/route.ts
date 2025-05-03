import { connectToDatabase } from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  console.log(body);
  try {
    const course = await Course.create(body);
    return NextResponse.json({
      message: "Course created",
      status: 201,
      data: course,
    });
  } catch (error) {
    console.log("Error at post course", error);
  }
}
