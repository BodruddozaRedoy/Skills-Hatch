import { NextRequest, NextResponse } from "next/server";
import Lesson from "@/models/Lesson";
import Course from "@/models/Course";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  // const body = await req.json()
  // console.log(body)
  const { courseId, chapterId, title, textContent, videoContent, resources } =
    await req.json();

  console.log("courseId", courseId, chapterId);

  if (!courseId || chapterId === undefined || !title) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // 1. Create the lesson
    const newLesson = await Lesson.create({
      courseId,
      chapterId,
      title,
      textContent,
      videoContent,
      resources,
    });

    // 2. Push lesson._id into the correct chapter's lessons array
    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: courseId,
        "chapters.chapterId": chapterId,
      },
      {
        $push: {
          "chapters.$.lessons": newLesson._id,
        },
      },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course or Chapter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Lesson added", lesson: newLesson });
  } catch (error) {
    console.error("Error adding lesson:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
