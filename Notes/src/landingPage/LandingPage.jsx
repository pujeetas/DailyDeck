import { useNavigate } from "react-router-dom";
import FeatureShowcase from "./components/FeatureShowcase";
import FAQ from "./components/FAQ";
import ScreenshotSection from "./components/ScreenshotSection";
import WhyDailyDeck from "./components/WhyDailyDeck";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <WhyDailyDeck />
      <FeatureShowcase />
      <ScreenshotSection />
      <FAQ />
      <Footer />
    </div>
  );
}
