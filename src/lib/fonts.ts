import { Zilla_Slab, DM_Mono, DM_Sans } from "next/font/google";

const zilla = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-zilla",
});
const dm_mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fontClassName = `${zilla.variable} ${dm_mono.variable} ${dm_sans.variable}`;

export { fontClassName };
