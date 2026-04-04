import { ref } from 'vue';

export function useUploader() {
  const progress = ref(0);
  const uploading = ref(false);

  async function uploadFiles(files: File[], oldImageUrls?: string[]): Promise<string[]> {
    // ✅ SSR GUARD
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Upload only works in browser'));
    }

    uploading.value = true;
    progress.value = 0;

    const formData = new FormData();

    // append files
    for (const file of files) {
      formData.append('file', file);
    }

    // append old public ids
    if (oldImageUrls?.length) {
      for (const url of oldImageUrls) {
        const filename = url.split('/').pop();
        if (!filename) continue;

        const publicId = filename.split('.')[0];
        if (publicId) {
          formData.append('oldPublicIds[]', publicId);
        }
      }
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          progress.value = Math.round((e.loaded / e.total) * 100);
        }
      };

      xhr.onload = () => {
        uploading.value = false;

        try {
          const res = JSON.parse(xhr.responseText) as {
            success: boolean;
            urls?: string[];
          };

          if (res.success && res.urls) {
            resolve(res.urls);
          } else {
            reject(new Error('Upload failed'));
          }
        } catch {
          reject(new Error('Invalid server response'));
        }
      };

      xhr.onerror = () => {
        uploading.value = false;
        reject(new Error('Network error'));
      };

      xhr.send(formData);
    });
  }

  return {
    uploadFiles,
    progress,
    uploading,
  };
}
