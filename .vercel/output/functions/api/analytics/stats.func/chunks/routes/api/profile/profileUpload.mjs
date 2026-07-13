import { v2 } from 'cloudinary';
import { d as defineEventHandler, K as readMultipartFormData } from '../../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
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
const profileUpload = defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    if (!formData) {
      return { success: false, message: "No form data received" };
    }
    const files = formData.filter(
      (f) => {
        var _a;
        return f.name === "file" && f.data && ((_a = f.type) == null ? void 0 : _a.startsWith("image/"));
      }
      // ✅ 'type' is correct for Nuxt 4
    );
    if (!files.length) {
      return { success: false, message: "No image files uploaded" };
    }
    const oldPublicIds = formData.filter((f) => f.name === "oldPublicIds[]" && f.data).map((f) => new TextDecoder().decode(f.data)).filter(Boolean);
    if (oldPublicIds.length) {
      await Promise.all(oldPublicIds.map((id) => v2.uploader.destroy(id)));
    }
    const uploadedUrls = await Promise.all(
      files.map((file) => {
        const buffer = Buffer.from(file.data);
        return new Promise((resolve, reject) => {
          const stream = v2.uploader.upload_stream(
            { folder: "avatars", resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              if (result == null ? void 0 : result.secure_url) resolve(result.secure_url);
              else reject(new Error("Upload failed"));
            }
          );
          stream.end(buffer);
        });
      })
    );
    return { success: true, urls: uploadedUrls };
  } catch (err) {
    console.error("Upload error:", err);
    const message = err instanceof Error ? err.message : typeof err === "string" ? err : "Upload failed";
    return { success: false, message };
  }
});

export { profileUpload as default };
//# sourceMappingURL=profileUpload.mjs.map
