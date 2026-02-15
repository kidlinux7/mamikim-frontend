import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: process.env.CONTABO_ENDPOINT,
    region: process.env.CONTABO_REGION || "default",
    credentials: {
        accessKeyId: process.env.CONTABO_ACCESS_KEY!,
        secretAccessKey: process.env.CONTABO_SECRET_KEY!,
    },
    forcePathStyle: true, // Required for many S3-compatible providers like Contabo
});

export const BUCKET_NAME = process.env.CONTABO_BUCKET_NAME;
