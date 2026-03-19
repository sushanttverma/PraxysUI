import Navbar from "./components/Navbar";
import HeroVoid from "./components/homepage/HeroVoid";
import PulseNumbers from "./components/homepage/PulseNumbers";
import ComponentWall from "./components/homepage/ComponentWall";
import SignalCTA from "./components/homepage/SignalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVoid />
        <PulseNumbers />
        <ComponentWall />
        <SignalCTA />
      </main>
      <Footer />
    </>
  );
}
