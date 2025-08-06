import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MatrixRain } from "./components/MatrixRain";
import { ParticleCursor } from "./components/ParticleCursor";
import { FloatingTextElements } from "./components/FloatingTextElements";
import { CursorEffects } from "./components/CursorEffects";
import { DigitalConstellation } from "./components/DigitalConstellation";
import { RealityDistortion } from "./components/RealityDistortion";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative cursor-none overflow-hidden">
      <RealityDistortion />
      <DigitalConstellation />
      <MatrixRain />
      <ParticleCursor />
      <FloatingTextElements />
      <CursorEffects />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}