import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ComponentShowcase from "./components/ComponentShowcase";
import Features from "./components/Features";
import ComponentGrid from "./components/ComponentGrid";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
      <Hero />
      <ComponentShowcase />
      <Features />
      <ComponentGrid />
      <CTA />
      </main>
      <Footer />
    </>
  );
}
