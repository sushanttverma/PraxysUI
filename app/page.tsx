import Navbar from "./components/Navbar";
import HeroVoid from "./components/homepage/HeroVoid";
import HorizontalShowcase from "./components/homepage/HorizontalShowcase";
import PulseNumbers from "./components/homepage/PulseNumbers";
import InteractiveForge from "./components/homepage/InteractiveForge";
import SignalCTA from "./components/homepage/SignalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVoid />
        <HorizontalShowcase />
        <PulseNumbers />
        <InteractiveForge />
        <SignalCTA />
      </main>
      <Footer />
    </>
  );
}
