import Navbar from "./components/Navbar";
import CinematicLoader from "./components/homepage/CinematicLoader";
import HeroVoid from "./components/homepage/HeroVoid";
import HorizontalShowcase from "./components/homepage/HorizontalShowcase";
import PulseNumbers from "./components/homepage/PulseNumbers";
import InteractiveForge from "./components/homepage/InteractiveForge";
import SignalCTA from "./components/homepage/SignalCTA";
import ScrollBarWidget from "./components/homepage/ScrollBarWidget";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <CinematicLoader />
      <Navbar />
      <ScrollBarWidget />
      <main id="main-content">
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
