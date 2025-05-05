import { connectToDatabase } from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  // console.log(body);
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

export async function GET(req: NextRequest) {
  await connectToDatabase();
  // const body = await req.json();
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  try {
    if (!kindeId)
      return NextResponse.json(
        { error: "kindId is required" },
        { status: 400 }
      );
    const courses = await Course.find({ "instructor.kindeId": kindeId });
    if (!courses) return NextResponse.json({ message: "Courses not found" });
    return NextResponse.json({
      message: "Course fetched",
      data: courses,
    });
  } catch (error) {
    console.log("Error at get course", error);
  }
}
