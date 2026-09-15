import { Building2, Compass, Heart, Home, Stethoscope, Users } from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Eyebrow, Finale, Section, SectionHead, TextLink } from "../ui";
import { Photo, photos } from "../photos";

const thesis = [
  { icon: Building2, title: "Boarding schools create a unique healthcare environment", copy: "Hundreds of children living together, far from their families, under the care of a health team that is often one or two people." },
  { icon: Home, title: "Children spend long periods away from home", copy: "A term is three months. In that time a child can be treated, referred, prescribed medication and recovered — entirely outside their parent's sight." },
  { icon: Users, title: "Schools become responsible for daily wellbeing", copy: "Not just education. Meals, sleep, injury, illness, medication, mental health and the judgement calls in between." },
  { icon: Heart, title: "Parents still want visibility", copy: "Not control, and not clinical detail they cannot interpret. Just to know that their child is being looked after, and to be told when something matters." },
  { icon: Stethoscope, title: "Clinicians need structured ways to support school health teams", copy: "A nurse with a difficult case needs a colleague, not a search engine. That colleague needs context, not a phone call with half the story." },
  { icon: Compass, title: "Mlezi exists to connect them", copy: "One coordinating layer between the school, the parent, the student and the clinical network — so care does not depend on who happens to remember what." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Mlezi"
        title="We believe distance should not create a gap in care."
        lede="Mlezi means a caregiver — someone entrusted with another person's wellbeing. That is the job a boarding school takes on the day a parent drops their child at the gate, and the job this company is built to support."
      />

      <Section>
        <div className="s-split s-split-wide s-split-top">
          <Photo photo={photos.aboutThesis} />
          <div>
            <Eyebrow>The founding thesis</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Six observations that became a company.</h2>
            <p className="s-lede">
              None of these is a technology problem. Together they are a coordination problem — and coordination is
              something software is genuinely good at.
            </p>
          </div>
        </div>
        <div className="s-grid-3" style={{ marginTop: 48 }}>
          {thesis.map((item) => (
            <div className="s-card" key={item.title}>
              <div className="s-icon"><item.icon size={18} /></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest" className="s-dark">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>Mission</Eyebrow>
            <p className="s-h3" style={{ marginTop: 16, color: "#fbfdfb" }}>
              Make high-quality, coordinated healthcare more accessible to children wherever they learn.
            </p>
          </div>
          <div>
            <Eyebrow dark>Vision</Eyebrow>
            <p className="s-h3" style={{ marginTop: 16, color: "#fbfdfb" }}>
              A world where every child can be cared for, even when they're far from home.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>Built for Kenya</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Health operations that speak the language of school life.</h2>
            <p className="s-lede">
              Houses, dormitories, forms, matrons, games afternoons, school trips, SMS, patchy connectivity and the
              everyday context of caring for children far from home.
            </p>
            <p className="s-body" style={{ marginTop: 18 }}>
              Mlezi is not a telemedicine product from somewhere else, translated. It was designed around how Kenyan
              boarding schools are actually organised, and the way a Kenyan school health department actually works.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 20, flexWrap: "wrap" }}>
              <TextLink href="/for-schools">For schools</TextLink>
              <TextLink href="/clinical-network">Clinical network</TextLink>
            </div>
          </div>
          <Photo photo={photos.aboutSchool} ratio="wide" />
        </div>
      </Section>

      <Section>
        <SectionHead
          center
          eyebrow="How we work"
          title="Principles we would rather be held to than described by."
          className="s-head-center"
        />
        <div className="s-grid-3" style={{ marginTop: 44 }}>
          {[
            { title: "Say only what is true", copy: "We do not claim certifications we have not earned, capabilities we do not have, or outcomes we have not measured. Where we are early, we say we are early." },
            { title: "The nurse is the point of care", copy: "Everything we build assumes a real health professional is with the child. We extend their capability. We never design around them." },
            { title: "Privacy is a design constraint", copy: "Who can see what is decided before a feature is built, not patched on after someone complains about it." },
            { title: "The child is not a user", copy: "Students are the people being cared for. We do not build engagement mechanics aimed at children, and we do not require them to carry devices." },
            { title: "Parents deserve legibility", copy: "A parent should be able to understand what they are being told, what it means, and what happens next — without a clinical background." },
            { title: "Build for the connection that exists", copy: "Not the connection a demo assumes. Offline-aware, tablet-friendly, and honest about what needs a network." },
          ].map((principle) => (
            <div className="s-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="grey" size="sm">
        <div className="s-head-split" style={{ marginBottom: 0 }}>
          <SectionHead eyebrow="The brand promise" title={<>Away from home. Never away from care.</>} lede="Everything on this site is an attempt to make that sentence operationally true." />
          <div style={{ paddingBottom: 8, display: "flex", gap: 11, flexWrap: "wrap" }}>
            <Btn href="/demo">Bring Mlezi to Your School</Btn>
            <Btn href="/contact" tone="outline" icon={false}>Talk to us</Btn>
          </div>
        </div>
      </Section>

      <Finale
        title={<>Care that stays with them.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}
