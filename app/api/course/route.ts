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

// get courses by instructor and course id

export async function GET(req: NextRequest) {
  await connectToDatabase();
  // const body = await req.json();
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");
  console.log(kindeId, courseId);
  try {
    if (!kindeId)
      return NextResponse.json(
        { error: "kindId is required" },
        { status: 400 }
      );
    if (kindeId && courseId) {
      const course = await Course.findOne({
        _id: courseId,
        "instructor.kindeId": kindeId,
      });
      if (!course) return NextResponse.json({ message: "Courses not found" });
      return NextResponse.json({
        message: "Single Course fetched",
        status: "200",
        data: course,
      });
    }

    if (kindeId) {
      const courses = await Course.find({ "instructor.kindeId": kindeId });
      if (!courses) return NextResponse.json({ message: "Courses not found" });
      return NextResponse.json({
        message: "Courses fetched",
        data: courses,
      });
    }
  } catch (error) {
    console.log("Error at get course", error);
  }
}

// update course data

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
    const {
      title,
      price,
      thumbnail,
      description,
      status,
      category,
      level,
      language,
      chapter,
    } = body;
    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (price) updatedData.price = price;
    if (thumbnail) updatedData.thumbnail = thumbnail;
    if (description) updatedData.description = description;
    if (status) updatedData.status = status;
    if (category) updatedData.category = category;
    if (level) updatedData.level = level;
    if (language) updatedData.language = language;

    // only chapter add
    if (chapter) {
      console.log("chapter", chapter);
      const course = await Course.findOne({
        _id: courseId,
        "instructor.kindeId": kindeId,
      });
      if (!course) return NextResponse.json({ message: "KindeId required" });
      console.log("course", course);
      course?.chapters.push(chapter);
      await course.save();
      return NextResponse.json({ message: "Chapter added", status: 201 });
    }

    // rest of the fields updated
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

// remove course and chapter 
export async function DELETE(req:NextRequest) {
  await connectToDatabase()
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");
  const chapterIdParam = url.searchParams.get("chapterId");
  const chapterId = chapterIdParam ? Number(chapterIdParam) : null;
  try {
    if(!kindeId && !courseId) return NextResponse.json({message: "KindeId and courseID required"})
      // delete a course 
    if(kindeId && courseId && !chapterId){
      await Course.findOneAndDelete({_id:courseId, 'instructor.kindeId': kindeId})
    return NextResponse.json({
      message: "Course deleted",
      status: 200
    })
    }

    // delete a chapter 
    if(chapterId){
      const deleteChapter = await Course.findOneAndUpdate({_id:courseId, 'instructor.kindeId': kindeId,}, {$pull: {chapters:{chapterId:chapterId}}})
      if(!deleteChapter){
        return NextResponse.json({
          message: "Chapter can't be deleted",
        })
      }
      return NextResponse.json({
        message: "Chapter deleted",
        status: 200
      })
    }
  } catch (error) {
    console.log("Error at delete course", error);
    
  }
}
