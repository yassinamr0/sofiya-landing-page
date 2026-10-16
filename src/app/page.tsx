import { Gate } from "@/components/gate/Gate";
import { Backdrop } from "@/components/hero/Backdrop";
import { Hero } from "@/components/hero/Hero";
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
        </main>
      </div>
    </>
  );
}
