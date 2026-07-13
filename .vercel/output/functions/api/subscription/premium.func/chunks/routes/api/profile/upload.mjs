import { v2 } from 'cloudinary';
import { eq } from 'drizzle-orm';
import { d as defineEventHandler, K as readMultipartFormData, c as createError, b as db, J as profile } from '../../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'zod';
import 'drizzle-orm/pg-core';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const upload = defineEventHandler(async (event) => {
  var _a;
  try {
    const formData = await readMultipartFormData(event);
    if (!formData) {
      throw createError({ statusCode: 400, message: "No form data received" });
    }
    const fileField = formData.find((f) => f.name === "avatar" && f.data);
    if (!fileField) {
      throw createError({ statusCode: 400, message: "No file uploaded" });
    }
    if (!((_a = fileField.type) == null ? void 0 : _a.startsWith("image/"))) {
      throw createError({ statusCode: 400, message: "Only image files are allowed" });
    }
    if (fileField.data.byteLength > 5 * 1024 * 1024) {
      throw createError({ statusCode: 400, message: "File size must be less than 5MB" });
    }
    const buffer = Buffer.from(fileField.data);
    const avatarUrl = await new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        { folder: "avatars", resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          if (result == null ? void 0 : result.secure_url) resolve(result.secure_url);
          else reject(new Error("Cloudinary upload failed"));
        }
      );
      stream.end(buffer);
    });
    await db.update(profile).set({ avatar: avatarUrl }).where(eq(profile.id, 1));
    return {
      success: true,
      avatarUrl,
      message: "Avatar updated successfully"
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw createError({ statusCode: 500, message: "Failed to upload avatar" });
  }
});

export { upload as default };
//# sourceMappingURL=upload.mjs.map
