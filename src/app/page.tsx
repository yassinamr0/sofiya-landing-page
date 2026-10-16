import { Gate } from "@/components/gate/Gate";
import { GooseLoader } from "@/components/goose/GooseLoader";
import { Backdrop } from "@/components/hero/Backdrop";
import { Hero } from "@/components/hero/Hero";
import { Chats } from "@/components/sections/Chats";
import { Contrast } from "@/components/sections/Contrast";
import { FinalCta } from "@/components/sections/FinalCta";
import { Fit } from "@/components/sections/Fit";
import { NotTemplate } from "@/components/sections/NotTemplate";
import { Objections } from "@/components/sections/Objections";
import { Results } from "@/components/sections/Results";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getContent } from "@/content";

export default function Home() {
  const content = getContent();

  return (
    <>
      <Gate content={content.gate} />

      {/* Everything after the gate. */}
      <div className="page-root relative">
        <Backdrop photos={content.hero.backdropPhotos} note={content.hero.backdropNote} />
        <SiteHeader
          brand={content.brand}
          applyLabel={content.apply.label}
          resetLabel={content.nav.reset}
        />
        <main id="page" tabIndex={-1} className="relative">
          <Hero content={content.hero} applyLabel={content.apply.label} />
          <Contrast content={content.contrast} planLabel={content.goose.tailorPlan} />
          <Chats content={content.chats} />
          <NotTemplate content={content.notTemplate} />
          <Results content={content.results} />
          <Objections content={content.objections} applyLabel={content.apply.label} />
          <Fit content={content.fit} pillLabel={content.goose.quickFix} />
          <FinalCta content={content.finalCta} applyLabel={content.apply.label} />
        </main>
        <SiteFooter brand={content.brand} content={content.footer} />
        <GooseLoader />
      </div>
    </>
  );
}
