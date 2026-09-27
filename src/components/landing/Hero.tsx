import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import {
  CardsMarkIcon,
  CompanionIcon,
  InterviewIcon,
  ProgressIcon,
  StudioIcon,
} from "@/components/icons";
import { FeatureCard } from "./FeatureCard";

const FEATURES = [
  { key: "companion", Icon: CompanionIcon },
  { key: "progress", Icon: ProgressIcon },
  { key: "studio", Icon: StudioIcon },
  { key: "interviews", Icon: InterviewIcon },
] as const;

export const Hero = async () => {
  const { t } = await getCurrentLocaleTranslation();

  return (
    <section className="flex justify-center bg-primary px-6 py-8 text-off-white sm:px-8 sm:py-10">
      <div className="flex w-full max-w-lg flex-col">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-off-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.18)]">
            <CardsMarkIcon className="size-5" />
          </span>
          <p className="font-serif text-lg font-bold">{t("common.brand")}</p>
        </div>

        <div className="mt-8 max-w-[24ch]">
          <h1 className="font-serif text-[2rem] leading-[1.1] font-bold tracking-tight">
            {t("home.headline")}
          </h1>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-on-navy">
            {t("home.tagline")}
          </p>
        </div>

        <ul className="mt-6 flex flex-col gap-2">
          {FEATURES.map(({ key, Icon }) => (
            <FeatureCard
              key={key}
              Icon={Icon}
              title={t(`home.features.${key}.title`)}
              body={t(`home.features.${key}.body`)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
