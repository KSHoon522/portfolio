import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Showcase from "@/components/Showcase";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Landing />
        <Experience />
        <Projects />
        <Showcase />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
