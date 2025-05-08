import { connectToDatabase } from "@/lib/mongoose";
import Chapter from "@/models/Chapter";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const url = new URL(req.url);
  const { title, quiz, lessons, courseId } = body;
  const kindeId = url.searchParams.get("kindeId");
  //   const courseId = url.searchParams.get("courseId");

  if (!kindeId || !courseId || !title)
    return NextResponse.json(
      { message: "Required field needed" },
      { status: 404 }
    );
  try {
    const chapter = await Chapter.create({
      courseId,
      title,
      quiz,
      lessons,
    });
    if (!chapter)
      return NextResponse.json({ message: "Couldn't create chapter" });
    // Add Chapter ID to Course
    await Course.findByIdAndUpdate(courseId, {
      $push: { chapters: chapter._id },
    });
    
    return NextResponse.json({ message: "Chapter added", status: 201 });
  } catch (error) {
    console.log("Error at add chapter", error);
  }
}
