import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME, S3_REGION } from "@/lib/s3";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const userResult = await sql`
      SELECT profile_photo FROM users WHERE id = ${userId}
    `;
    const oldPhotoUrl = userResult.rows[0]?.profile_photo;

    const fileExtension = file.name.split(".").pop() || "jpg";
    const fileName = `avatars/${userId}-${Date.now()}.${fileExtension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadCommand = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(uploadCommand);

    const photoUrl = `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${fileName}`;

    await sql`
      UPDATE users 
      SET profile_photo = ${photoUrl}
      WHERE id = ${userId}
    `;

    if (oldPhotoUrl) {
      try {
        const urlParts = oldPhotoUrl.split(
          `${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/`
        );
        if (urlParts.length > 1) {
          const oldKey = urlParts[1];

          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: S3_BUCKET_NAME,
              Key: oldKey,
            })
          );

          console.log("Deleted old photo from S3:", oldKey);
        }
      } catch (deleteError) {
        console.error("Failed to delete old photo from S3:", deleteError);
      }
    }

    return NextResponse.json({ url: photoUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
