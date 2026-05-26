export type Project = {
  id: string;
  title: string;
  /** ISO date string, e.g. "2024-08-15" */
  createdAt: string;
  description?: string;
  images: { src: string; alt: string }[];
  /** Set when the project is deployed — shows a live site link in the gallery */
  liveUrl?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: "budde-roofing",
    title: "Budde Roofing",
    createdAt: "2025-10-01",
    description:
      "A business website for a roofing company to showcase their services and portfolio. Built with Next.js, Node.js, and TypeScript.",
    images: [
      { src: "/projects/budde-roofing/budde1.png", alt: "Budde Roofing homepage" },
      { src: "/projects/budde-roofing/budde2.png", alt: "Budde Roofing services" },
      { src: "/projects/budde-roofing/budde3.png", alt: "Budde Roofing contact" },
    ],
    tags: ["Website", "Frontend Developer"],
    liveUrl: "https://budderoofingandgutters.ca/",
  },
  {
    id: "designers-circle",
    title: "Designers Circle",
    createdAt: "2025-07-01",
    description:
      "A trading platform for interior designers to create a schedule for their clients. Built with Next.js, Node.js, and TypeScript.",
    images: [
      { src: "/projects/designers-circle/dc1.png", alt: "Designers Circle landing" },
      { src: "/projects/designers-circle/dc2.png", alt: "Designers Circle gallery" },
      { src: "/projects/designers-circle/dc3.png", alt: "Designers Circle detail" },
    ],
    tags: ["Website", "Frontend Developer"],
    liveUrl: "https://designerscircle.co.uk/",
  },
  {
    id: "izaj-web",
    title: "Izaj E-Commerce Web Application",
    createdAt: "2025-03-01",
    description:
      "An e-commerce website platform dedicated for IZAJ to sell their products online. Built with Next.js, Node.js, and TypeScript.",
    images: [
      { src: "/projects/izaj-web/izaj1.png", alt: "Izaj Web dashboard" },
      { src: "/projects/izaj-web/izaj2.png", alt: "Izaj Web feature view" },
      { src: "/projects/izaj-web/izaj3.png", alt: "Izaj Web mobile layout" },
    ],
    tags: ["E-Commerce Website", "Backend Developer"],
    liveUrl: "https://izaj-ecommerce.vercel.app/",
  },
  {
    id: "izaj-desktop",
    title: "Izaj Desktop Application",
    createdAt: "2025-03-01",
    description:
      "A dedication desktop application for IZAJ to manage their products that are used in their e-commerce platform. Built with React, Tailwind CSS, Tauri, and TypeScript.",
    images: [
      { src: "/projects/izaj-desktop/izajdesktop4.png", alt: "Izaj Desktop settings" },
      { src: "/projects/izaj-desktop/izajdesktop1.png", alt: "Izaj Desktop main" },
      { src: "/projects/izaj-desktop/izajdesktop2.png", alt: "Izaj Desktop workspace" },
      { src: "/projects/izaj-desktop/izajdesktop3.png", alt: "Izaj Desktop module" },
    ],
    tags: ["Desktop Application", "Backend Developer"],
  },
  {
    id: "mira-web",
    title: "MIRA Admin Web Application",
    createdAt: "2026-02-16",
    description:
      "An admin dashboard for managing asset and IT resources across a company. Built with Next.js, TypeScript, and Golang.",
    images: [
      { src: "/projects/mira-web/mira-web-1.png", alt: "Mira Web home" },
      { src: "/projects/mira-web/mira-web-2.png", alt: "Mira Web features" },
      { src: "/projects/mira-web/mira-web-3.png", alt: "Mira Web content" },
      { src: "/projects/mira-web/mira-web-4.png", alt: "Mira Web responsive" },
    ],
    tags: ["Website", "Backend Developer"],
    liveUrl: "https://mira-sys.vercel.app/",
  },
  {
    id: "tech-hub",
    title: "TechHub Mobile Application",
    createdAt: "2025-01-20",
    description:
      "A mobile application for browsing different kind of devices. Built with flutter and dart.",
    images: [
      { src: "/projects/tech-hub/th1.jpg", alt: "Tech Hub overview" },
      { src: "/projects/tech-hub/th2.jpg", alt: "Tech Hub listing" },
      { src: "/projects/tech-hub/th3.jpg", alt: "Tech Hub detail" },
    ],
    tags: ["Mobile Application", "Backend Developer"],
  },
  {
    id: "bles",
    title: "BLES Web Portal",
    createdAt: "2025-11-01",
    description:
        "A web portal for BLES staff to manage their students and for students to submit an application for admission. Built with SvelteKit.",
      images: [
      { src: "/projects/bles/bles-1.png", alt: "BLES overview" },
      { src: "/projects/bles/bles-2.png", alt: "BLES listing" },
      { src: "/projects/bles/bles-3.png", alt: "BLES detail" },
      { src: "/projects/bles/bles-4.png", alt: "BLES detail" },
      { src: "/projects/bles/bles-5.png", alt: "BLES detail" },
    ],
    tags: ["Website", "Frontend Developer"],
  },
];

/** Newest first, oldest last */
export const projectsByDate = [...projects].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
