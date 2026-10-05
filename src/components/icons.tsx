type IconProps = { className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const DashboardIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
};

export const JobsIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
};

export const DocumentsIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
};

export const SettingsIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <circle cx="16" cy="7" r="2" />
      <path d="M4 17h4" />
      <path d="M12 17h8" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
};

export const ChevronLeftIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

export const MenuIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
};

export const CloseIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export const CardsMarkIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <rect x="9" y="3" width="11" height="15" rx="2" />
      <path d="M15 21H6a2 2 0 0 1-2-2V8" />
    </svg>
  );
};

export const CompanionIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M20 11.5a7.5 7.5 0 0 1-8.5 7.4L7 21l.5-3.2A7.5 7.5 0 1 1 20 11.5z" />
      <path d="M9 11h.01" />
      <path d="M13.5 11h.01" />
    </svg>
  );
};

export const ProgressIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M5 20v-5" />
      <path d="M12 20V9" />
      <path d="M19 20V4" />
    </svg>
  );
};

export const StudioIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M13 3v5h5" />
      <path d="M17.5 21H15v-2.5l5-5a1.8 1.8 0 0 1 2.5 2.5z" />
    </svg>
  );
};

export const InterviewIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 5a2 2 0 0 1 2-2h14v14H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 0 2 2h14" />
      <path d="M9 7h6" />
    </svg>
  );
};

export const GoogleIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5C29.4 34.9 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.9l6.5 5.5C39.8 36.9 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
};

export const LinkedInIcon = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
};
