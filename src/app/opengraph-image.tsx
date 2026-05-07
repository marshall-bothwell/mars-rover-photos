import { renderOGImage, ogSize } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Mars Rover Photos';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOGImage();
}
