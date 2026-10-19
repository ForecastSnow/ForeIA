import type { CSSProperties } from 'react';
import brandIcon from '../../assets/foreia-mark.svg';

const paths = {
  spark: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z',
  plus: 'M12 5v14M5 12h14',
  search: 'm21 21-4.5-4.5M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z',
  chat: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z',
  arrow: 'M7 17 17 7M7 7h10v10',
  send: 'M12 19V5m-6 6 6-6 6 6',
  chevron: 'm9 5 7 7-7 7',
  down: 'm6 9 6 6 6-6',
  panel: 'M9 3v18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z',
  pen: 'm16 3 5 5M4 20l4-1 13-13a2.1 2.1 0 0 0-3-3L5 16l-1 4Z',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20',
  bulb: 'M9 18h6m-5 3h4M8.5 14.5a6 6 0 1 1 7 0L15 17H9l-.5-2.5Z',
  compass: 'm16 8-2.5 5.5L8 16l2.5-5.5L16 8ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  book: 'M12 5v16M3 3h4a5 5 0 0 1 5 2 5 5 0 0 1 5-2h4v16h-4a5 5 0 0 0-5 2 5 5 0 0 0-5-2H3V3Z',
  help: 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z',
  logout: 'M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4m7-14 5 5-5 5M21 12H9',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6',
  copy: 'M9 9h12v12H9V9ZM15 9V3H3v12h6',
  refresh: 'M20 7v5h-5M4 17v-5h5M5.1 7a8 8 0 0 1 13.2-2L20 7M4 17l1.7 2A8 8 0 0 0 18.9 17',
  shield: 'M12 22s9-4 9-11V5l-9-3-9 3v6c0 7 9 11 9 11Zm-4-10 3 3 5-6',
  leaf: 'M20 4C10 2 3 7 5 14c2 7 13 6 15-10ZM4 21 15 10',
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 20, className = '', style }: { name: IconName; size?: number; className?: string; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function Brand({ small = false }: { small?: boolean }) {
  return <img className={`brand-mark ${small ? 'brand-mark-small' : ''}`} src={brandIcon} alt="" width={small ? 33 : 39} height={small ? 33 : 39} />;
}
