import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    cgpa: "",
    interest: "",
  });

  const interests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Web Development",
    "Cloud Computing",
  ];

  const degrees = [
    "Computer Science",
    "Artificial Intelligence & ML",
    "Information Technology",
    "Data Science",
    "Electronics & Communication",
    "Other",
  ];

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const nextStep = () => {
    setError("");

    if (step === 1 && !formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (step === 2 && !formData.degree) {
      setError("Please select your degree.");
      return;
    }

    if (step === 3) {
      const cgpa = Number(formData.cgpa);

      if (!formData.cgpa || Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        setError("Please enter a valid CGPA between 0 and 10.");
        return;
      }
    }

    setStep((previous) => previous + 1);
  };

  const previousStep = () => {
    setError("");

    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const submitAssessment = async () => {
    if (!formData.interest) {
      setError("Please select an area of interest.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            degree: formData.degree,
            cgpa: Number(formData.cgpa),
            interest: formData.interest,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed.");
      }

      const result = await response.json();

      // Save the real FastAPI response
      localStorage.setItem(
        "hirelens_result",
        JSON.stringify(result)
      );

      // Also save the original profile
      localStorage.setItem(
        "hirelens_profile",
        JSON.stringify(formData)
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to HireLens backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">

        <div className="text-center">

          <p className="text-cyan-400 font-bold tracking-[0.3em] text-sm">
            HIRELENS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Career Assessment
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Discover careers that match your academic profile,
            interests, and goals.
          </p>

        </div>


        {/* Progress */}

        <div className="mt-12">

          <div className="flex justify-between text-sm mb-3">

            <span className="text-zinc-400">
              Step {step} of 4
            </span>

            <span className="text-zinc-400">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </section>


      {/* Assessment Card */}

      <section className="max-w-3xl mx-auto px-6 pb-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">

          {/* STEP 1 */}

          {step === 1 && (
            <div>

              <p className="text-cyan-400 font-bold text-sm tracking-widest">
                STEP 1
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Let's get to know you.
              </h2>

              <p className="text-zinc-400 mt-3">
                Start with your name so we can personalize your report.
              </p>


              <div className="mt-8">

                <label className="block text-sm font-semibold mb-3">
                  Your name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                />

              </div>

            </div>
          )}


          {/* STEP 2 */}

          {step === 2 && (
            <div>

              <p className="text-cyan-400 font-bold text-sm tracking-widest">
                STEP 2
              </p>

              <h2 className="text-3xl font-bold mt-3">
                What's your academic background?
              </h2>

              <p className="text-zinc-400 mt-3">
                Select the degree area closest to your current studies.
              </p>


              <div className="mt-8">

                <label className="block text-sm font-semibold mb-3">
                  Degree / Specialization
                </label>

                <select
                  value={formData.degree}
                  onChange={(e) =>
                    updateField("degree", e.target.value)
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                >

                  <option value="">
                    Select your degree
                  </option>

                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}

                </select>

              </div>

            </div>
          )}


          {/* STEP 3 */}

          {step === 3 && (
            <div>

              <p className="text-cyan-400 font-bold text-sm tracking-widest">
                STEP 3
              </p>

              <h2 className="text-3xl font-bold mt-3">
                How are your academics?
              </h2>

              <p className="text-zinc-400 mt-3">
                Your academic performance helps us understand your profile.
              </p>


              <div className="mt-8">

                <label className="block text-sm font-semibold mb-3">
                  Current CGPA
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(e) =>
                    updateField("cgpa", e.target.value)
                  }
                  placeholder="Example: 9.2"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                />

                <p className="text-zinc-600 text-sm mt-2">
                  Enter a value between 0 and 10.
                </p>

              </div>

            </div>
          )}


          {/* STEP 4 */}

          {step === 4 && (
            <div>

              <p className="text-cyan-400 font-bold text-sm tracking-widest">
                STEP 4
              </p>

              <h2 className="text-3xl font-bold mt-3">
                What interests you?
              </h2>

              <p className="text-zinc-400 mt-3">
                Choose the area you'd enjoy exploring.
              </p>


              <div className="mt-8 grid sm:grid-cols-2 gap-3">

                {interests.map((interest) => {

                  const selected =
                    formData.interest === interest;

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() =>
                        updateField("interest", interest)
                      }
                      className={`text-left p-5 rounded-2xl border transition ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                          : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <span className="font-semibold">
                          {interest}
                        </span>

                        {selected && (
                          <span className="text-cyan-400">
                            ✓
                          </span>
                        )}

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>
          )}


          {/* Error */}

          {error && (
            <div className="mt-6 p-4 rounded-xl border border-red-400/20 bg-red-400/5 text-red-400 text-sm">
              {error}
            </div>
          )}


          {/* Navigation */}

          <div className="flex gap-4 mt-10">

            {step > 1 && (
              <button
                onClick={previousStep}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold transition disabled:opacity-50"
              >
                ← Back
              </button>
            )}


            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:opacity-90 transition"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={submitAssessment}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading
                  ? "Generating Report..."
                  : "Generate My Career Report →"}
              </button>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Assessment;