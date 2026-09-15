import { cn } from "../pages/shared";

/**
 * Documentary photography used across the marketing site, sourced from Pexels
 * (free to use; attribution is not required by their license but is credited
 * here as a small caption out of courtesy — see https://www.pexels.com/license/).
 */
export interface PhotoMeta {
  src: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
}

export const photos = {
  homeCare: {
    src: "/images/home-care.jpg",
    alt: "A community health worker sitting outdoors with two children she cares for",
    photographer: "Khanh Hoang Minh 2",
    photographerUrl: "https://www.pexels.com/@khanh-hoang-minh-2-77752098",
  },
  parentsCare: {
    src: "/images/parents-care.jpg",
    alt: "A healthcare worker examines a young child held close by their mother",
    photographer: "Mahyub Hamida",
    photographerUrl: "https://www.pexels.com/@mahyub-hamida-736226299",
  },
  impactCheckup: {
    src: "/images/impact-checkup.jpg",
    alt: "A schoolboy in uniform receives a dental screening at a community clinic",
    photographer: "Ellison Ei",
    photographerUrl: "https://www.pexels.com/@ellison-ei-841351147",
  },
  portraitCare: {
    src: "/images/portrait-care.jpg",
    alt: "Portrait of a smiling healthcare professional in a white coat with a stethoscope",
    photographer: "Tessy Agbonome",
    photographerUrl: "https://www.pexels.com/@tessy-agbonome-521343232",
  },
  aboutThesis: {
    src: "/images/about-thesis.jpg",
    alt: "A nurse attends to a young patient while a guardian looks on in a hospital ward",
    photographer: "Speak Media Uganda",
    photographerUrl: "https://www.pexels.com/@speakmediauganda",
  },
  aboutSchool: {
    src: "/images/about-school.jpg",
    alt: "A group of students in uniform standing outside their school building",
    photographer: "Speak Media Uganda",
    photographerUrl: "https://www.pexels.com/@speakmediauganda",
  },
  classroomStudents: {
    src: "/images/classroom-students.jpg",
    alt: "Secondary school students in uniform attending a lesson",
    photographer: "Tosin Olowoleni",
    photographerUrl: "https://www.pexels.com/@tosin-olowoleni-2148141635",
  },
  clinicianNotes: {
    src: "/images/clinician-notes.jpg",
    alt: "A clinician in a white coat writing notes",
    photographer: "Ivan S",
    photographerUrl: "https://www.pexels.com/@ivan-s",
  },
  parentPhone: {
    src: "/images/parent-phone.jpg",
    alt: "A parent smiling while taking a phone call",
    photographer: "Dellon Thomas",
    photographerUrl: "https://www.pexels.com/@elsimage",
  },
} satisfies Record<string, PhotoMeta>;

/** A framed documentary photo with a very small photographer credit beneath it. */
export function Photo({
  photo, dark, ratio, className,
}: { photo: PhotoMeta; dark?: boolean; ratio?: "wide" | "tall"; className?: string }) {
  return (
    <figure className={cn("s-photo-figure", className)}>
      <div className={cn("s-photo-frame", ratio === "wide" && "is-wide", ratio === "tall" && "is-tall")}>
        <img src={photo.src} alt={photo.alt} loading="lazy" />
      </div>
      <figcaption className={cn("s-photo-credit", dark && "on-dark")}>
        Photo: <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer">{photo.photographer}</a> / Pexels
      </figcaption>
    </figure>
  );
}

/** A small circular portrait used in tight spaces, with a tiny credit line beneath it. */
export function PhotoBadge({ photo, size = 52, dark }: { photo: PhotoMeta; size?: number; dark?: boolean }) {
  return (
    <div style={{ flexShrink: 0, textAlign: "center" }}>
      <img src={photo.src} alt={photo.alt} loading="lazy" className="s-photo-badge" style={{ width: size, height: size }} />
      <figcaption className={cn("s-photo-credit", dark && "on-dark")} style={{ marginTop: 5, fontSize: 9 }}>
        <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
      </figcaption>
    </div>
  );
}
