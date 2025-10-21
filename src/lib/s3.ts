import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.AWS_REGION) {
  throw new Error("AWS_REGION is not defined in environment variables");
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID is not defined in environment variables");
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error(
    "AWS_SECRET_ACCESS_KEY is not defined in environment variables"
  );
}

if (!process.env.AWS_S3_BUCKET_NAME) {
  throw new Error("AWS_S3_BUCKET_NAME is not defined in environment variables");
}

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const S3_REGION = process.env.AWS_REGION;
