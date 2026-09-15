import { generalFaq, parentFaq } from "../content";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Eyebrow, Faq, Finale, Section, SectionHead } from "../ui";
import { Photo, photos } from "../photos";

export default function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        cream
        eyebrow="Frequently asked questions"
        title="What Mlezi is, what it isn't, and who pays for what."
        lede="If your question isn't answered here, ask us directly — we would rather have the conversation than let you guess."
        actions={<>
          <Btn href="/contact" tone="primary" size="lg">Ask us a question</Btn>
          <Btn href="/demo" tone="outline" size="lg" icon={false}>Book a demo</Btn>
        </>}
      />

      <Section>
        <div className="s-split s-split-top" style={{ gap: 48, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 92 }}>
            <SectionHead eyebrow="General" title="About Mlezi" lede="The questions schools, parents and clinicians ask before anything else." />
          </div>
          <Faq items={generalFaq} />
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-top" style={{ gap: 48, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 92 }}>
            <SectionHead eyebrow="For parents" title="Mlezi Care" lede="Written for the parent deciding whether this is worth KES 250 a term." />
            <div style={{ marginTop: 26 }}><Btn href="/for-parents">See the parent experience</Btn></div>
            <div style={{ marginTop: 26, maxWidth: 300 }}><Photo photo={photos.parentPhone} ratio="tall" /></div>
          </div>
          <Faq items={parentFaq} defaultOpen={-1} />
        </div>
      </Section>

      <Section tone="grey" size="sm">
        <div className="s-head-split" style={{ marginBottom: 0 }}>
          <div className="s-head">
            <Eyebrow>Still unsure?</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Talk to someone who has set this up in a school like yours.</h2>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", gap: 11, flexWrap: "wrap" }}>
            <Btn href="/demo">Book a Demo</Btn>
            <Btn href="/contact" tone="outline" icon={false}>Contact us</Btn>
          </div>
        </div>
      </Section>

      <Finale
        title={<>Being at boarding school shouldn't mean being out of the loop.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}
