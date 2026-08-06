import Button from "./Button";
import DashboardPreview from "./DashboardPreview";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

      <p className="text-cyan-400 font-semibold tracking-widest uppercase">
        AI-Powered Career Intelligence
      </p>

      <h1 className="text-6xl md:text-7xl font-extrabold mt-5 leading-tight">
  Discover Your
  <br />
  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
    Dream Career
  </span>
</h1>

      <p className="text-zinc-400 text-xl mt-6 max-w-2xl">
        HireLens helps students discover the right career path,
        identify skill gaps, and become placement-ready using AI.
      </p>

      <div className="mt-10 flex gap-5">
      <Button
  text="Start Your Journey"
  onClick={() => navigate("/assessment")}
/>

    <Button
        text="Watch Demo"
        bg="bg-zinc-800"
    />
</div>
    <DashboardPreview />
    </section>
  );
}

export default Hero;