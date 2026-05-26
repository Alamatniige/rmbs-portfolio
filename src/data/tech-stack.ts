import type { ComponentType, SVGProps } from "react";
import {
  CplusplusOriginal,
  Css3Original,
  DartOriginal,
  FlutterOriginal,
  GoOriginal,
  Html5Original,
  JavaOriginal,
  NextjsOriginal,
  NodejsOriginal,
  PythonOriginal,
  ReactOriginal,
  SvelteOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
} from "devicons-react";

export type TechIcon = ComponentType<SVGProps<SVGElement> & { size?: number | string }>;

export type TechItem = {
  id: string;
  name: string;
  Icon: TechIcon;
};

export type TechCategory = {
  id: string;
  title: string;
  description: string;
  items: TechItem[];
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    description: "Interfaces, design systems, and product-facing experiences.",
    items: [
      { id: "react", name: "React", Icon: ReactOriginal },
      { id: "nextjs", name: "Next.js", Icon: NextjsOriginal },
      { id: "svelte", name: "Svelte", Icon: SvelteOriginal },
      { id: "typescript", name: "TypeScript", Icon: TypescriptOriginal },
      { id: "tailwind", name: "Tailwind CSS", Icon: TailwindcssOriginal },
      { id: "html", name: "HTML5", Icon: Html5Original },
      { id: "css", name: "CSS3", Icon: Css3Original },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Servers, services, and data layers that power applications.",
    items: [
      { id: "nodejs", name: "Node.js", Icon: NodejsOriginal },
      { id: "python", name: "Python", Icon: PythonOriginal },
      { id: "go", name: "Go", Icon: GoOriginal },
      { id: "java", name: "Java", Icon: JavaOriginal },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform apps with native performance and polish.",
    items: [
      { id: "flutter", name: "Flutter", Icon: FlutterOriginal },
      { id: "dart", name: "Dart", Icon: DartOriginal },
    ],
  },
  {
    id: "systems",
    title: "Systems & Languages",
    description: "Lower-level tooling and languages in the toolbox.",
    items: [{ id: "cpp", name: "C++", Icon: CplusplusOriginal }],
  },
];

/** Flat list for marquee and quick reference */
export const allTechItems = techCategories.flatMap((category) => category.items);
