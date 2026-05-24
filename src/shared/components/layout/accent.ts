export type AccentColor =
  | 'purple'
  | 'cyan'
  | 'pink'
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'red';

interface AccentClasses {
  text: string;
  borderLeft: string;
  hoverBorder: string;
  bg: string;
  ring: string;
}

export const ACCENT_CLASSES: Record<AccentColor, AccentClasses> = {
  purple: {
    text: 'text-purple-400',
    borderLeft: 'border-l-purple-400',
    hoverBorder: 'hover:border-purple-400',
    bg: 'bg-purple-400/10',
    ring: 'ring-purple-400/40',
  },
  cyan: {
    text: 'text-cyan-400',
    borderLeft: 'border-l-cyan-400',
    hoverBorder: 'hover:border-cyan-400',
    bg: 'bg-cyan-400/10',
    ring: 'ring-cyan-400/40',
  },
  pink: {
    text: 'text-pink-400',
    borderLeft: 'border-l-pink-400',
    hoverBorder: 'hover:border-pink-400',
    bg: 'bg-pink-400/10',
    ring: 'ring-pink-400/40',
  },
  blue: {
    text: 'text-blue-400',
    borderLeft: 'border-l-blue-400',
    hoverBorder: 'hover:border-blue-400',
    bg: 'bg-blue-400/10',
    ring: 'ring-blue-400/40',
  },
  green: {
    text: 'text-green-400',
    borderLeft: 'border-l-green-400',
    hoverBorder: 'hover:border-green-400',
    bg: 'bg-green-400/10',
    ring: 'ring-green-400/40',
  },
  orange: {
    text: 'text-orange-400',
    borderLeft: 'border-l-orange-400',
    hoverBorder: 'hover:border-orange-400',
    bg: 'bg-orange-400/10',
    ring: 'ring-orange-400/40',
  },
  yellow: {
    text: 'text-yellow-400',
    borderLeft: 'border-l-yellow-400',
    hoverBorder: 'hover:border-yellow-400',
    bg: 'bg-yellow-400/10',
    ring: 'ring-yellow-400/40',
  },
  red: {
    text: 'text-red-400',
    borderLeft: 'border-l-red-400',
    hoverBorder: 'hover:border-red-400',
    bg: 'bg-red-400/10',
    ring: 'ring-red-400/40',
  },
};
