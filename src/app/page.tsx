import { AppProvider } from "./components/AppProvider";
import { SmoothScroll } from "./components/SmoothScroll";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Capabilities } from "./components/Capabilities";
import { Projects } from "./components/Projects";
import { Principles } from "./components/Principles";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <AppProvider>
      <SmoothScroll />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <Projects />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
