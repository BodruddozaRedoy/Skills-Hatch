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

export async function PATCH(req: NextRequest) {
  await connectToDatabase();
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");
  console.log("kindeId", kindeId);
  console.log("courseId", courseId);
  try {
    if (!kindeId || !courseId)
      return NextResponse.json({ message: "Valid id is required" });
    const body = await req.json();
    const { title, price, thumbnail, description, status } = body;
    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (price) updatedData.price = price;
    if (thumbnail) updatedData.thumbnail = thumbnail;
    if (description) updatedData.description = description;
    if (status) updatedData.status = status;
    const course = await Course.findOneAndUpdate(
      { _id: courseId, "instructor.kindeId": kindeId },
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return NextResponse.json(
        { message: "Course not found or update failed" },
        { status: 404 }
      );
    }
    // Return the updated course
    return NextResponse.json({
      message: `Updated`,
      status: 200,
    });
  } catch (error) {
    console.log("Error at patch course", error);
  }
}
