export const getPrayerIcon = (prayerKey: string) => {
  switch (prayerKey) {
    case 'Fajr':
      return 'moon-outline';
    case 'Dhuhr':
      return 'sunny-outline';
    case 'Asr':
      return 'partly-sunny-outline';
    case 'Maghrib':
      return 'partly-sunny-outline';
    case 'Isha':
      return 'cloudy-night-outline';
    default:
      return 'time-outline';
  }
};
