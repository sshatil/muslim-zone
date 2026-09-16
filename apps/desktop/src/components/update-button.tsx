import { useState } from 'react';

import { checkForAppUpdate, installAppUpdate } from '#lib/updater';
import { Button } from '@muslim-zone/ui/components/button';

export function UpdateButton() {
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const handleCheckForUpdates = async () => {
    try {
      setIsChecking(true);
      setMessage('');
      setProgress(0);

      const update = await checkForAppUpdate();

      if (!update) {
        setMessage('You are using the latest version.');
        return;
      }

      const shouldUpdate = window.confirm(
        `Muslim Zone ${update.version} is available. Update now?`,
      );

      if (!shouldUpdate) {
        return;
      }

      setIsUpdating(true);
      setMessage(`Downloading Muslim Zone ${update.version}...`);

      await installAppUpdate(update, (value) => {
        setProgress(value);
      });

      setMessage('Update installed successfully. Please restart Muslim Zone.');
    } catch (error) {
      console.error('Update failed:', error);
      setMessage('Failed to update Muslim Zone.');
    } finally {
      setIsChecking(false);
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Button
        type='button'
        onClick={handleCheckForUpdates}
        disabled={isChecking || isUpdating}
      >
        {isChecking
          ? 'Checking...'
          : isUpdating
            ? `Updating ${progress}%`
            : 'Check for Updates'}
      </Button>

      {isUpdating && (
        <div>
          <progress value={progress} max={100} />
          <span>{progress}%</span>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
