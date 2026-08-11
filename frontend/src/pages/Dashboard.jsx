import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const storedResult = localStorage.getItem("hirelens_result");
  const storedProfile = localStorage.getItem("hirelens_profile");

  let result = null;
  let profile = null;

  try {
    result = storedResult ? JSON.parse(storedResult) : null;
    profile = storedProfile ? JSON.parse(storedProfile) : null;
  } catch (error) {
    console.error("Could not read HireLens result:", error);
  }

  /* =========================================
     NO RESULT
  ========================================= */

  if (!result) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">

          <p className="text-cyan-400 font-bold tracking-[0.25em] text-sm">
            HIRELENS
          </p>

          <h1 className="text-4xl font-bold mt-5">
            Your dashboard is waiting.
          </h1>

          <p className="text-zinc-400 mt-4 leading-relaxed">
            Complete the career assessment first and we'll build
            your personalized career profile here.
          </p>

          <button
            onClick={() => navigate("/assessment")}
            className="mt-8 px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-bold hover:opacity-90 transition"
          >
            Take Assessment →
          </button>

        </div>
      </div>
    );
  }

  /* =========================================
     HELPER FUNCTIONS
  ========================================= */

  const normalizeArray = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "object") {
      return Object.entries(value).map(([name, data]) => {
        if (typeof data === "object" && data !== null) {
          return {
            ...data,
            name:
              data.name ||
              data.career ||
              data.title ||
              data.role ||
              name,
          };
        }

        return {
          name,
          score: data,
        };
      });
    }

    return [];
  };

  const getCareerName = (career) => {
    if (typeof career === "string") {
      return career;
    }

    if (!career || typeof career !== "object") {
      return "Career";
    }

    return (
      career.career ||
      career.name ||
      career.title ||
      career.role ||
      career.career_name ||
      career.position ||
      "Career"
    );
  };

  const getCareerScore = (career, index) => {
    if (typeof career === "object" && career !== null) {
      const value =
        career.score ??
        career.match ??
        career.match_score ??
        career.percentage ??
        career.fit ??
        career.rating;

      const number = Number(value);

      if (!Number.isNaN(number)) {
        return Math.min(100, Math.max(0, number));
      }
    }

    /*
      If the backend only returns career names,
      give them a visual ranking score.
    */

    return Math.max(70, 95 - index * 7);
  };

  const getSkillName = (skill) => {
    if (typeof skill === "string") {
      return skill;
    }

    if (!skill || typeof skill !== "object") {
      return "Skill";
    }

    return (
      skill.name ||
      skill.skill ||
      skill.title ||
      skill.skill_name ||
      "Skill"
    );
  };

  const getSkillLevel = (skill, index) => {
    if (typeof skill === "object" && skill !== null) {
      const value =
        skill.level ??
        skill.score ??
        skill.priority ??
        skill.percentage;

      const number = Number(value);

      if (!Number.isNaN(number)) {
        return Math.min(100, Math.max(0, number));
      }
    }

    return Math.max(40, 90 - index * 8);
  };

  const getRoadmapText = (item) => {
    if (typeof item === "string") {
      return item;
    }

    if (!item || typeof item !== "object") {
      return "Recommended step";
    }

    return (
      item.title ||
      item.name ||
      item.step ||
      item.description ||
      item.action ||
      "Recommended step"
    );
  };

  /* =========================================
     NORMALIZE BACKEND DATA
  ========================================= */

  const careerList = normalizeArray(
    result.careers ||
      result.career_matches ||
      result.careerMatches ||
      result.recommended_careers ||
      []
  );

  const skillList = normalizeArray(
    result.skills ||
      result.recommended_skills ||
      result.skill_development ||
      []
  );

  const roadmap = normalizeArray(
    result.roadmap ||
      result.learning_path ||
      result.learningPath ||
      []
  );

  /* =========================================
     PRIMARY CAREER
  ========================================= */

  const firstCareer = careerList[0];

  const primaryCareer =
    result.primary_career ||
    result.primaryCareer ||
    getCareerName(firstCareer);

  let primaryScore = null;

  if (
    result.primary_score !== undefined &&
    result.primary_score !== null
  ) {
    primaryScore = Number(result.primary_score);
  } else if (
    result.primaryScore !== undefined &&
    result.primaryScore !== null
  ) {
    primaryScore = Number(result.primaryScore);
  } else if (firstCareer && typeof firstCareer === "object") {
    primaryScore = Number(
      firstCareer.score ??
        firstCareer.match ??
        firstCareer.match_score ??
        firstCareer.percentage ??
        firstCareer.fit
    );
  }

  if (Number.isNaN(primaryScore)) {
    primaryScore = null;
  }

  /* =========================================
     MAIN DASHBOARD
  ========================================= */

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="border-b border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-14">

          <p className="text-cyan-400 font-bold text-sm tracking-[0.25em]">
            HIRELENS DASHBOARD
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Welcome back,{" "}
            {result.name || profile?.name || "there"}.
          </h1>

          <p className="text-zinc-400 text-lg mt-4">
            Here's what HireLens found from your profile.
          </p>

        </div>

      </section>


      {/* =====================================
          PROFILE SUMMARY
      ===================================== */}

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-5">

          {/* DEGREE */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm tracking-wide">
              DEGREE
            </p>

            <h2 className="text-xl font-bold mt-4">
              {result.degree ||
                profile?.degree ||
                "Not available"}
            </h2>

          </div>


          {/* CGPA */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm tracking-wide">
              CGPA
            </p>

            <h2 className="text-3xl font-bold text-cyan-400 mt-3">
              {result.cgpa ?? profile?.cgpa ?? "--"}
            </h2>

          </div>


          {/* INTEREST */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm tracking-wide">
              PRIMARY INTEREST
            </p>

            <h2 className="text-xl font-bold mt-4">
              {result.interest ||
                profile?.interest ||
                "Not available"}
            </h2>

          </div>

        </div>

      </section>


      {/* =====================================
          TOP CAREER
      ===================================== */}

      <section className="max-w-6xl mx-auto px-6 py-8">

        <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 rounded-3xl p-8">

          <p className="text-cyan-400 font-bold text-sm tracking-widest">
            TOP CAREER MATCH
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">

            <div>

              <h2 className="text-4xl font-bold">
                {primaryCareer}
              </h2>

              {(result.primary_description ||
                result.primaryDescription) && (

                <p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">
                  {result.primary_description ||
                    result.primaryDescription}
                </p>

              )}

            </div>

            {primaryScore !== null && (

              <div className="text-left md:text-right">

                <p className="text-5xl font-bold text-cyan-400">
                  {primaryScore}%
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  profile match
                </p>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================
          CAREER MATCHES
      ===================================== */}

      {careerList.length > 0 && (

        <section className="max-w-6xl mx-auto px-6 py-10">

          <div className="mb-8">

            <p className="text-cyan-400 font-bold text-sm tracking-widest">
              CAREER FIT
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Your Career Matches
            </h2>

            <p className="text-zinc-500 mt-2">
              Career paths ranked according to your assessment profile.
            </p>

          </div>


          <div className="space-y-4">

            {careerList.map((career, index) => {

              const name = getCareerName(career);

              const score = getCareerScore(
                career,
                index
              );

              return (

                <div
                  key={`${name}-${index}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-400/40 transition"
                >

                  <div className="flex items-center gap-5">

                    {/* RANK */}

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-bold">

                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}

                    </div>


                    <div className="flex-1 min-w-0">

                      <div className="flex items-center justify-between gap-4">

                        <h3 className="text-xl font-bold text-white truncate">
                          {name}
                        </h3>

                        <span className="text-cyan-400 font-bold text-lg shrink-0">
                          {score}%
                        </span>

                      </div>


                      {/* SCORE BAR */}

                      <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700"
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* =====================================
          SKILLS
      ===================================== */}

      {skillList.length > 0 && (

        <section className="max-w-6xl mx-auto px-6 py-10">

          <div className="mb-8">

            <p className="text-cyan-400 font-bold text-sm tracking-widest">
              SKILL DEVELOPMENT
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Skills You Should Build
            </h2>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            {skillList.map((skill, index) => {

              const name = getSkillName(skill);

              const level = getSkillLevel(
                skill,
                index
              );

              return (

                <div
                  key={`${name}-${index}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      {name}
                    </span>

                    <span className="text-cyan-400 font-semibold">
                      {level}%
                    </span>

                  </div>


                  <div className="h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{
                        width: `${level}%`,
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* =====================================
          ROADMAP
      ===================================== */}

      {roadmap.length > 0 && (

        <section className="max-w-6xl mx-auto px-6 py-10">

          <div className="mb-8">

            <p className="text-cyan-400 font-bold text-sm tracking-widest">
              CAREER ROADMAP
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Your Recommended Learning Path
            </h2>

          </div>


          <div className="space-y-4">

            {roadmap.map((item, index) => {

              const text = getRoadmapText(item);

              return (

                <div
                  key={`${text}-${index}`}
                  className="flex gap-5"
                >

                  {/* NUMBER */}

                  <div className="w-11 h-11 shrink-0 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-bold">

                    {index + 1}

                  </div>


                  {/* STEP */}

                  <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h3 className="text-xl font-bold">
                      {text}
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      Recommended step {index + 1}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* =====================================
          INSIGHT
      ===================================== */}

      {result.insight && (

        <section className="max-w-6xl mx-auto px-6 py-10">

          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 p-8">

            <p className="text-cyan-400 font-bold text-sm tracking-widest">
              HIRELENS INSIGHT
            </p>

            <p className="text-lg text-zinc-300 leading-relaxed mt-4">
              {result.insight}
            </p>

          </div>

        </section>

      )}


      {/* =====================================
          BOTTOM ACTIONS
      ===================================== */}

      <section className="max-w-6xl mx-auto px-6 py-10 pb-24">

        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={() => navigate("/assessment")}
            className="flex-1 px-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold transition"
          >
            ← Retake Assessment
          </button>


          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-bold transition hover:opacity-90"
          >
            Back to HireLens →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;