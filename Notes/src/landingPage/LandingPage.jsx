import { useNavigate } from "react-router-dom";
import FeatureShowcase from "./components/FeatureShowcase";
import FAQ from "./components/FAQ";
import UseCases from "./components/UseCases";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkflowSteps from "./components/WorkflowSteps";
import WhyDailyDeck from "./components/WhyDailyDeck";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0a08] text-white overflow-hidden selection:bg-amber-500/30">
      <Navbar />
      <Hero />
      <WhyDailyDeck />
      <FeatureShowcase />
      <WorkflowSteps />
      <UseCases />
      <FAQ />
      <Footer />
    </div>
  );
}
