import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_CONTABO_ENDPOINT,
    region: process.env.NEXT_PUBLIC_CONTABO_REGION || "default",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_CONTABO_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_CONTABO_SECRET_KEY!,
    },
    forcePathStyle: true, // Required for many S3-compatible providers like Contabo
});

export const BUCKET_NAME = process.env.NEXT_PUBLIC_CONTABO_BUCKET_NAME;
export const TENANT_ID = process.env.NEXT_PUBLIC_CONTABO_TENANT_ID;
