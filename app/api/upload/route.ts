import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const form = new IncomingForm();
    const data = await new Promise<{ fields: Fields; files: Files }>(
      (resolve, reject) => {
        form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      }
    );

    const file = data.files.file?.[0];

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.mimetype?.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only video files are allowed" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(file.filepath, {
      resource_type: "video",
      folder: "course_videos",
    });

    // Clean up the temporary file
    await fs.promises.unlink(file.filepath);

    return NextResponse.json({ url: upload.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
