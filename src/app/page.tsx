import Footer from "@/components/landing/footer";
import About from "@/components/landing/section/about";
import Banner from "@/components/landing/section/banner";
import Contact from "@/components/landing/section/contact";
import Projects from "@/components/landing/section/projects";
import TechStack from "@/components/landing/section/tech-stack";

export default function Home() {
  return (
    <>
      <Banner />
      <About />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
}