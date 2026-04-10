import { logEvent, logScreenView } from '@/lib/firebase';
import { useCallback, useEffect } from 'react';

/**
 * Per-screen analytics hook.
 *
 * - Automatically logs a `screen_view` event when the component mounts.
 * - Returns a stable `track` helper for logging custom events from the screen.
 *
 * @param screenName The human-readable name of the screen (e.g. "Home")
 *
 * @example
 * export default function HomeScreen() {
 *   const { track } = useAnalytics('Home');
 *
 *   const handleDuaCopy = () => {
 *     track(EVENT_DUA_COPIED, { dua_id: '1' });
 *   };
 * }
 */
export function useAnalytics(screenName: string) {
  useEffect(() => {
    logScreenView(screenName);
  }, [screenName]);

  const track = useCallback(
    (eventName: string, params?: Record<string, string | number | boolean>) => {
      logEvent(eventName, params);
    },
    [],
  );

  return { track };
}
