import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoShowcase from "./components/BentoShowcase";
import NumbersBar from "./components/NumbersBar";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <BentoShowcase />
        <NumbersBar />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
