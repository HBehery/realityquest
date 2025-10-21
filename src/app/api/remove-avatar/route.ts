import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME, S3_REGION } from "@/lib/s3";
import { sql } from "@vercel/postgres";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const userResult = await sql`
      SELECT profile_photo FROM users WHERE id = ${userId}
    `;
    const photoUrl = userResult.rows[0]?.profile_photo;

    await sql`
      UPDATE users 
      SET profile_photo = NULL
      WHERE id = ${userId}
    `;

    if (photoUrl) {
      try {
        const urlParts = photoUrl.split(
          `${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/`
        );
        if (urlParts.length > 1) {
          const key = urlParts[1];

          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: S3_BUCKET_NAME,
              Key: key,
            })
          );
        }
      } catch (deleteError) {
        console.error("Failed to delete photo from S3:", deleteError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Remove error:", error);
    return NextResponse.json(
      { error: "Remove failed", details: error.message },
      { status: 500 }
    );
  }
}
