import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnnouncementBar from "@/components/AnnouncementBar";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900 selection:bg-[#7c3aed] selection:text-white">
      <Preloader />
      <Navbar />
      <Hero />
      <AnnouncementBar />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
