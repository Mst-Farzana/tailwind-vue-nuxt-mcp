// server/api/profile/avatar.ts
import { v2 as cloudinary } from 'cloudinary';
import { eq } from 'drizzle-orm';
import { createError, defineEventHandler, readMultipartFormData } from 'h3';
import { db } from '~/server/db';
import { profile } from '~/server/db/schemas/index';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async event => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({ statusCode: 400, message: 'No form data received' });
    }

    const fileField = formData.find(f => f.name === 'avatar' && f.data);

    if (!fileField) {
      throw createError({ statusCode: 400, message: 'No file uploaded' });
    }

    // Validate file type
    if (!fileField.type?.startsWith('image/')) {
      throw createError({ statusCode: 400, message: 'Only image files are allowed' });
    }

    // Validate file size (5MB max)
    if (fileField.data.byteLength > 5 * 1024 * 1024) {
      throw createError({ statusCode: 400, message: 'File size must be less than 5MB' });
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(fileField.data);
    const avatarUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'avatars', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error('Cloudinary upload failed'));
        },
      );
      stream.end(buffer);
    });

    // Update database (profile id=1 is the demo profile row)
    await db.update(profile).set({ avatar: avatarUrl }).where(eq(profile.id, 1));

    return {
      success: true,
      avatarUrl,
      message: 'Avatar updated successfully',
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw createError({ statusCode: 500, message: 'Failed to upload avatar' });
  }
});
