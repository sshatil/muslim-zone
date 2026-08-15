export const getPrayerIcon = (prayerKey: string) => {
  switch (prayerKey) {
    case 'Fajr':
      return 'cloudy-night-outline';
    case 'Dhuhr':
      return 'sunny-outline';
    case 'Asr':
      return 'partly-sunny-outline';
    case 'Maghrib':
      return 'partly-sunny';
    case 'Isha':
      return 'moon-outline';
    default:
      return 'time-outline';
  }
};
