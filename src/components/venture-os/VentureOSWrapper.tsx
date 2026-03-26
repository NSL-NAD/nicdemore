"use client";
import { usePathname } from 'next/navigation';
import { VentureOS } from './VentureOS';

export function VentureOSWrapper() {
  const pathname = usePathname();
  // Exclude from hidden resume pages
  if (pathname.startsWith('/resume')) return null;
  return <VentureOS />;
}
