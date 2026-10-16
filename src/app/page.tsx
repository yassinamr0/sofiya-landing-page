import { Gate } from "@/components/gate/Gate";
import { Backdrop } from "@/components/hero/Backdrop";
import { Hero } from "@/components/hero/Hero";
import { Chats } from "@/components/sections/Chats";
import { Contrast } from "@/components/sections/Contrast";
import { NotTemplate } from "@/components/sections/NotTemplate";
import { SiteHeader } from "@/components/SiteHeader";
import { getContent } from "@/content";

export default function Home() {
  const content = getContent();

  return (
    <>
      <Gate content={content.gate} />

      {/* Everything after the gate. */}
      <div className="page-root relative">
        <Backdrop note={content.hero.backdropNote} />
        <SiteHeader
          brand={content.brand}
          applyLabel={content.apply.label}
          resetLabel={content.nav.reset}
        />
        <main id="page" tabIndex={-1} className="relative">
          <Hero content={content.hero} applyLabel={content.apply.label} />
          <Contrast content={content.contrast} />
          <Chats content={content.chats} />
          <NotTemplate content={content.notTemplate} />
        </main>
      </div>
    </>
  );
}
