import { check, type Update } from '@tauri-apps/plugin-updater';

export async function checkForAppUpdate(): Promise<Update | null> {
  try {
    return await check();
  } catch (error) {
    console.error('Failed to check for updates:', error);
    throw error;
  }
}

export async function installAppUpdate(
  update: Update,
  onProgress?: (progress: number) => void,
): Promise<void> {
  let downloaded = 0;
  let contentLength = 0;

  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case 'Started':
        contentLength = event.data.contentLength ?? 0;
        downloaded = 0;
        onProgress?.(0);
        break;

      case 'Progress':
        downloaded += event.data.chunkLength;

        if (contentLength > 0) {
          const progress = Math.round((downloaded / contentLength) * 100);

          onProgress?.(progress);
        }

        break;

      case 'Finished':
        onProgress?.(100);
        break;
    }
  });
}
