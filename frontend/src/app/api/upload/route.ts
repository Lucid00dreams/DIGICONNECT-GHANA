import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Clean filename
    const isVideo = file.type.startsWith("video/");
    const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/api/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
      mediaType: isVideo ? "video" : "image",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload media file" },
      { status: 500 }
    );
  }
}
