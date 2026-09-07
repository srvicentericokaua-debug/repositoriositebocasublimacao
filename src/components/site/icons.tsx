type IconProps = { className?: string };

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        d="M12 20.5s-7.5-4.6-9.8-9.2C.6 7.7 2.2 4 6 4c2.1 0 3.6 1.2 6 3.6C14.4 5.2 15.9 4 18 4c3.8 0 5.4 3.7 3.8 7.3-2.3 4.6-9.8 9.2-9.8 9.2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 13h18M12 9v11" />
      <path d="M12 9C9 9 8 7.2 8 6a2.2 2.2 0 0 1 4-1.3A2.2 2.2 0 0 1 16 6c0 1.2-1 3-4 3Z" strokeLinejoin="round" />
    </svg>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeLinecap="round" />
      <path d="M12 8.5 13.4 11l2.5 1.4-2.5 1.4L12 16.2l-1.4-2.4L8.1 12.4l2.5-1.4Z" strokeLinejoin="round" />
    </svg>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path d="M3 11l4-4 4 3 2-2 4 3 4-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 11v3l4 4 3-2 2 2 4-3 4-4v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        d="M12 3.5 19 6.3v5.4c0 4.6-3 8.1-7 9.8-4-1.7-7-5.2-7-9.8V6.3L12 3.5Z"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const destaqueIcons = {
  heart: HeartIcon,
  gift: GiftIcon,
  sparkles: SparklesIcon,
  handshake: HandshakeIcon,
  shield: ShieldIcon,
};
