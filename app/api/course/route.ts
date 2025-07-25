import { connectToDatabase } from "@/lib/mongoose";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

//! Post a course
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

//! Get course
export async function GET(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");

  if (!kindeId) {
    return NextResponse.json({ error: "kindeId is required" }, { status: 400 });
  }

  try {
    // 🟢 Case 1: Fetch a single course by courseId with chapters and lessons
    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return NextResponse.json(
          { error: "Invalid courseId format" },
          { status: 400 }
        );
      }

      const courseData = await Course.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(courseId),
            "instructor.kindeId": kindeId,
          },
        },
        {
          // 🔄 Lookup chapters with a nested pipeline
          $lookup: {
            from: "chapters", // Lookup the Chapter collection
            localField: "chapters", // This is the `ObjectId` array in Course
            foreignField: "_id", // This is the `_id` field in the Chapter model
            as: "chapters", // This will store the resulting chapters
            pipeline: [
              {
                $lookup: {
                  from: "lessons", // Lookup the Lesson collection
                  localField: "_id", // Match Chapter `_id`
                  foreignField: "chapterId", // Match Lesson's `chapterId`
                  as: "lessons", // Store lessons in each chapter
                },
              },
            ], // This will be executed as part of the lookup to get lessons per chapter
          },
        },
      ]);

      if (!courseData || courseData.length === 0) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Course with chapters and lessons fetched",
        data: courseData[0], // The result is an array, but we only need the first element
      });
    }

    // Case 2: Fetch all courses with chapters and lessons
    const courses = await Course.aggregate([
      {
        $match: { "instructor.kindeId": kindeId },
      },
      {
        $lookup: {
          from: "chapters",
          localField: "chapters",
          foreignField: "_id",
          as: "chapters",
          pipeline: [
            {
              $lookup: {
                from: "lessons",
                localField: "_id",
                foreignField: "chapterId",
                as: "lessons",
              },
            },
          ],
        },
      },
      {
        $addFields: {
          content: {
            $reduce: {
              input: {
                $map: {
                  input: "$chapters",
                  as: "ch",
                  in: { $ifNull: ["$$ch.lessons", []] },
                },
              },
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    return NextResponse.json({
      message: "All courses fetched for instructor",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching course(s):", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// update course data

export async function PATCH(req: NextRequest) {
  await connectToDatabase();
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");
  const chapterId = url.searchParams.get("chapterId");
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
      lesson,
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

    // only lesson add
    if (lesson && chapterId) {
      console.log("lesson", lesson);
      const course = await Course.findOne(
        {
          _id: courseId,
          "instructor.kindeId": kindeId,
          "chapters.chapterId": chapterId,
        },
        { $push: { "chapters.$.lessons": lesson } }
      );
      if (!course) return NextResponse.json({ message: "KindeId required" });
      return NextResponse.json({ message: "Lesson added", status: 201 });
      // course?.chapters?.
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

//! remove course and chapter
export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const url = new URL(req.url);
  const kindeId = url.searchParams.get("kindeId");
  const courseId = url.searchParams.get("courseId");
  const chapterIdParam = url.searchParams.get("chapterId");
  const chapterId = chapterIdParam ? Number(chapterIdParam) : null;
  try {
    if (!kindeId && !courseId)
      return NextResponse.json({ message: "KindeId and courseID required" });
    // delete a course
    if (kindeId && courseId && !chapterId) {
      await Course.findOneAndDelete({
        _id: courseId,
        "instructor.kindeId": kindeId,
      });
      return NextResponse.json({
        message: "Course deleted",
        status: 200,
      });
    }

    // delete a chapter
    if (chapterId) {
      const deleteChapter = await Course.findOneAndUpdate(
        { _id: courseId, "instructor.kindeId": kindeId },
        { $pull: { chapters: { chapterId: chapterId } } }
      );
      if (!deleteChapter) {
        return NextResponse.json({
          message: "Chapter can't be deleted",
        });
      }
      return NextResponse.json({
        message: "Chapter deleted",
        status: 200,
      });
    }
  } catch (error) {
    console.log("Error at delete course", error);
  }
}
