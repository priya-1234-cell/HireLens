import FeatureCard from "./FeatureCard";
import { FaBrain, FaChartLine, FaRoute } from "react-icons/fa";


function Features() {
    const features = [
        {
          title: "AI Career Match",
          description:
            "Discover careers that match your skills and interests using AI.",
          icon: <FaBrain />,
        },
        {
          title: "Skill Gap Analysis",
          description:
            "Know exactly what skills you need to land your dream job.",
          icon: <FaChartLine />,
        },
        {
          title: "Personalized Roadmap",
          description:
            "Receive a step-by-step learning path tailored just for you.",
          icon: <FaRoute />,
        },
      ];

  return (
    <section className="max-w-6xl mx-auto py-24 px-6">
      <h2 className="text-4xl font-bold text-center">
        Why Choose HireLens?
      </h2>

      <p className="text-zinc-400 text-center mt-4">
        Everything you need to become placement-ready.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {features.map((feature) => (
          <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
        ))}
      </div>
    </section>
  );
}

export default Features;