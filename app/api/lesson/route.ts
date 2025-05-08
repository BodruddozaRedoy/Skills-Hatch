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

    return NextResponse.json({
      message: "Lesson added",
      lesson: newLesson,
      status: 201,
    });
  } catch (error) {
    console.error("Error adding lesson:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// delete a lesson
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const lessonId = url.searchParams.get("lessonId");
  if (!lessonId) return NextResponse.json({ message: "Lesson id required" });
  try {
    const isDelete = await Lesson.findByIdAndDelete(lessonId);
    if (!isDelete) return NextResponse.json({ message: "Lesson id required" });
    return NextResponse.json({
      message: "Lesson deleted",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
