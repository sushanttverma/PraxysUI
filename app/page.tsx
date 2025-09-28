import Navbar from "./components/Navbar";
import HeroExperimental from "./components/HeroExperimental";
import BentoShowcase from "./components/BentoShowcase";
import NumbersBar from "./components/NumbersBar";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroExperimental />
        <BentoShowcase />
        <NumbersBar />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
