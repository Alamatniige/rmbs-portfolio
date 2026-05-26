export const siteConfig = {
  name: "Ruiz Miguel B. Sapio",
  shortName: "rmbs.",
  /** Update with your inbox — used for mailto contact form */
  contactEmail: "sapioruiz27@gmail.com",
  /** Place your PDF at public/resume.pdf (or change this path) */
  resumePath: "/resume.pdf",
} as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
] as const;

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/alamatniige",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ruiz-miguel-sapio-0b4a63270/",
  },
  {
    name: "GitHub",
    url: "https://github.com/Alamatniige",
  },
] as const;
