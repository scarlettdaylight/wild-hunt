import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getAuthUser } from "@/lib/auth/getAuthUser";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { ROUTES } from "@/lib/routes";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Hero } from "@/components/landing/Hero";
import { SignInPanel } from "@/components/landing/SignInPanel";

const Home = async () => {
  const user = await getAuthUser();
  if (user) redirect(await getLocalizedPath(ROUTES.dashboard));

  return (
    <main className="flex flex-1 flex-col lg:grid lg:grid-cols-[44fr_56fr]">
      <Hero />

      <div className="flex flex-1 flex-col px-6 py-8 sm:px-10">
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <Suspense>
            <SignInPanel />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Home;
