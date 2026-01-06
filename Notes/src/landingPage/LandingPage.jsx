import { useNavigate } from "react-router-dom";
import FeatureShowcase from "./components/FeatureShowcase";
import FAQ from "./components/FAQ";
import UseCases from "./components/UseCases"; // Use the new UseCases instead of Testimonials
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkflowSteps from "./components/WorkflowSteps";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    // CHANGE: Removed 'bg-white', added 'bg-[#0a0a0a] text-white' to be safe
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-emerald-500/30 ">
      <Navbar />
      <Hero />

      {/* We will update these components next */}
      <UseCases />
      <FeatureShowcase />
      <WorkflowSteps />
      <FAQ />
      <Footer />
    </div>
  );
}
