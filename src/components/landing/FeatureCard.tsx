import { ComponentType } from "react";

export const FeatureCard = ({
  Icon,
  title,
  body,
}: {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) => {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/7 p-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/12 text-on-navy">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-sm leading-tight font-bold text-off-white">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-on-navy">
          {body}
        </span>
      </span>
    </li>
  );
};
