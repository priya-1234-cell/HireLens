import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      title: "Career Assessment",
      description:
        "Answer a few focused questions about your education, academics, and interests.",
    },
    {
      number: "02",
      title: "Smart Matching",
      description:
        "HireLens compares your profile against multiple technology career paths.",
    },
    {
      number: "03",
      title: "Personalized Roadmap",
      description:
        "Get the skills and learning steps you should focus on next.",
    },
  ];

  const careerPaths = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Cybersecurity Analyst",
    "Full Stack Developer",
    "Cloud Engineer",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ==============================
          HERO
      ============================== */}

      <section className="relative overflow-hidden">

        {/* Background glow */}

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 relative">

          <div className="max-w-4xl">

            <p className="text-cyan-400 font-bold tracking-[0.3em] text-sm">
              HIRELENS
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-5">
              Stop guessing.
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Start building your career.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mt-7 leading-relaxed">
              HireLens analyzes your academic background, interests,
              and goals to help you discover technology careers that
              fit your profile.
            </p>


            {/* CTA */}

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              <button
                onClick={() => navigate("/assessment")}
                className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold transition"
              >
                Take Career Assessment →
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 font-bold transition"
              >
                See How It Works
              </button>

            </div>

          </div>


          {/* Mini stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl">

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-3xl font-bold text-cyan-400">
                10+
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Career paths
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-3xl font-bold text-cyan-400">
                3
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Top matches
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-3xl font-bold text-cyan-400">
                1
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Personalized roadmap
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-3xl font-bold text-cyan-400">
                AI
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Career intelligence
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ==============================
          HOW IT WORKS
      ============================== */}

      <section
        id="how-it-works"
        className="border-t border-white/10"
      >

        <div className="max-w-6xl mx-auto px-6 py-24">

          <div className="max-w-2xl mb-14">

            <p className="text-cyan-400 font-bold text-sm tracking-widest">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl font-bold mt-3">
              From uncertainty to direction.
            </h2>

            <p className="text-zinc-400 mt-4 text-lg">
              A short assessment turns your profile into an actionable
              career starting point.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {features.map((feature) => (

              <div
                key={feature.number}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-cyan-400/40 transition"
              >

                <p className="text-cyan-400 text-sm font-bold">
                  {feature.number}
                </p>

                <h3 className="text-2xl font-bold mt-5">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 mt-4 leading-relaxed">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==============================
          CAREER PATHS
      ============================== */}

      <section className="border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-24">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

            <div>

              <p className="text-cyan-400 font-bold text-sm tracking-widest">
                EXPLORE POSSIBILITIES
              </p>

              <h2 className="text-4xl font-bold mt-3">
                Where could you fit?
              </h2>

            </div>

            <p className="text-zinc-500 max-w-md">
              HireLens currently evaluates multiple technology-focused
              career directions based on your profile.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {careerPaths.map((career, index) => (

              <div
                key={career}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-400/40 transition"
              >

                <div className="flex items-center justify-between">

                  <span className="text-zinc-600 text-sm font-bold">
                    0{index + 1}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-6">
                  {career}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==============================
          FINAL CTA
      ============================== */}

      <section className="border-t border-white/10">

        <div className="max-w-4xl mx-auto px-6 py-28 text-center">

          <p className="text-cyan-400 font-bold tracking-widest text-sm">
            YOUR NEXT MOVE
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            You don't need your whole career figured out.
          </h2>

          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto">
            You just need a direction worth exploring.
            Let HireLens help you find one.
          </p>

          <button
            onClick={() => navigate("/assessment")}
            className="mt-8 px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-bold hover:opacity-90 transition"
          >
            Find My Career Path →
          </button>

        </div>

      </section>


      {/* ==============================
          FOOTER
      ============================== */}

      <footer className="border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-3">

          <p className="font-bold">
            HireLens
          </p>

          <p className="text-zinc-600 text-sm">
            Career intelligence for the next generation.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;