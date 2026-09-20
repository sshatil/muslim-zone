import { check, type Update } from '@tauri-apps/plugin-updater';

export async function checkForAppUpdate(): Promise<Update | null> {
  try {
    const update = await check();

    console.log('Update check result:', update);

    return update;
  } catch (error) {
    console.error('Failed to check for updates:', error);
    throw error;
  }
}

export async function installAppUpdate(
  update: Update,
  onProgress?: (progress: number) => void,
): Promise<void> {
  try {
    console.log('Installing update:', update.version);

    let downloaded = 0;
    let contentLength = 0;

    await update.downloadAndInstall((event) => {
      console.log('Update event:', event);

      switch (event.event) {
        case 'Started':
          console.log('Download started');

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
          console.log('Download finished');
          onProgress?.(100);
          break;
      }
    });

    console.log('Update installed successfully');
  } catch (error) {
    console.error('UPDATE INSTALLATION FAILED:', error);
    throw error;
  }
}
