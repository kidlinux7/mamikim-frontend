import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, BUCKET_NAME } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        const { filename, contentType } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json(
                { error: "Filename and contentType are required" },
                { status: 400 }
            );
        }

        const key = `videos/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            ACL: 'public-read', // Ensure the uploaded file is publicly accessible
        });

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        // Contabo requires the Tenant ID followed by a COLON and then the Bucket Name
        const tenantId = process.env.NEXT_PUBLIC_CONTABO_TENANT_ID || '7f46490e5a1444b7936e15fd196f9685';
        const bucket = process.env.NEXT_PUBLIC_CONTABO_BUCKET_NAME || 'coursecontent';
        const encodedKey = key.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const publicUrl = `${process.env.NEXT_PUBLIC_CONTABO_ENDPOINT}/${tenantId}:${bucket}/${encodedKey}`;

        return NextResponse.json({ uploadUrl, publicUrl, key });
    } catch (error) {
        console.error("Presigned URL error:", error);
        return NextResponse.json(
            { error: "Failed to generate upload URL" },
            { status: 500 }
        );
    }
}
