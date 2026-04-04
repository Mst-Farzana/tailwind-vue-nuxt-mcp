import { v2 as cloudinary } from 'cloudinary';
import { defineEventHandler, readMultipartFormData } from 'h3';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async event => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      return { success: false, message: 'No form data received' };
    }

    // 🖼️ Only image files (use 'type', not 'contentType')
    const files = formData.filter(
      f => f.name === 'file' && f.data && f.type?.startsWith('image/'), // ✅ 'type' is correct for Nuxt 4
    );

    if (!files.length) {
      return { success: false, message: 'No image files uploaded' };
    }

    // 🗑️ Optional old images deletion
    const oldPublicIds = formData
      .filter(f => f.name === 'oldPublicIds[]' && f.data)
      .map(f => new TextDecoder().decode(f.data))
      .filter(Boolean);

    if (oldPublicIds.length) {
      await Promise.all(oldPublicIds.map(id => cloudinary.uploader.destroy(id)));
    }

    // 📤 Upload new files in parallel
    const uploadedUrls = await Promise.all(
      files.map(file => {
        const buffer = Buffer.from(file.data); // Uint8Array → Buffer

        return new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'avatars', resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              if (result?.secure_url) resolve(result.secure_url);
              else reject(new Error('Upload failed'));
            },
          );
          stream.end(buffer);
        });
      }),
    );

    return { success: true, urls: uploadedUrls };
  } catch (err: unknown) {
    console.error('Upload error:', err);

    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : 'Upload failed';

    return { success: false, message };
  }
});
