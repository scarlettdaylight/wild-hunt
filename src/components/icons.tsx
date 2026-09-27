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
}

export const JobsIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export const DocumentsIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

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
}

export const ChevronLeftIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export const MenuIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export const CloseIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export const CardsMarkIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <rect x="9" y="3" width="11" height="15" rx="2" />
      <path d="M15 21H6a2 2 0 0 1-2-2V8" />
    </svg>
  );
}

export const CompanionIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M20 11.5a7.5 7.5 0 0 1-8.5 7.4L7 21l.5-3.2A7.5 7.5 0 1 1 20 11.5z" />
      <path d="M9 11h.01" />
      <path d="M13.5 11h.01" />
    </svg>
  );
}

export const ProgressIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M5 20v-5" />
      <path d="M12 20V9" />
      <path d="M19 20V4" />
    </svg>
  );
}

export const StudioIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M13 3v5h5" />
      <path d="M17.5 21H15v-2.5l5-5a1.8 1.8 0 0 1 2.5 2.5z" />
    </svg>
  );
}

export const InterviewIcon = ({ className }: IconProps) => {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 5a2 2 0 0 1 2-2h14v14H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 0 2 2h14" />
      <path d="M9 7h6" />
    </svg>
  );
}
