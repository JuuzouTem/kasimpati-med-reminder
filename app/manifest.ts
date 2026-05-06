import { MetadataRoute } from 'next';
import { CHRYSANTHEMUM_THEME } from '@/lib/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kasımpatı Med Reminder',
    short_name: 'Kasımpatı',
    description: 'Sessiz ve görsel odaklı ilaç hatırlatıcısı.',
    start_url: '/',
    display: 'standalone',
    background_color: CHRYSANTHEMUM_THEME.colors.cream,
    theme_color: CHRYSANTHEMUM_THEME.colors.purple,
    orientation: 'portrait',
    icons:[
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}