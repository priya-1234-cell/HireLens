import { useState } from "react";

function Assessment() {
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [careers, setCareers] = useState([]);
  

  function generateReport() {

    if (degree === "AIML") {

      if (cgpa >= 9) {
    
        setCareers([
          "AI Research Scientist",
          "Machine Learning Engineer",
          "Computer Vision Engineer"
        ]);
    
      }
    
      else if (cgpa >= 8) {
    
        setCareers([
          "AI Engineer",
          "Data Scientist",
          "Python Developer"
        ]);
    
      }
    
      else {
    
        setCareers([
          "Python Developer",
          "Data Analyst",
          "QA Engineer"
        ]);
    
      }
    
    }
  
    else if (degree === "CSE") {
      setCareers([
        "Software Engineer",
        "Full Stack Developer",
        "Backend Developer"
      ]);
    }
  
    else if (degree === "IT") {
      setCareers([
        "Cloud Engineer",
        "DevOps Engineer",
        "System Administrator"
      ]);
    }
  
    else if (degree === "ECE") {
      setCareers([
        "Embedded Systems Engineer",
        "IoT Engineer",
        "Robotics Engineer"
      ]);
    }
  
    else {
      setCareers(["No recommendations available"]);
    }
  
    setShowReport(true);
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-5xl font-bold mb-4">
        Career Assessment
      </h1>

      <p className="text-zinc-400 mb-10">
        Let's find your perfect career path 🚀
      </p>

      <div className="w-full max-w-xl space-y-6">

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none focus:border-cyan-400"
        />

        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        >
          <option value="">Select your degree</option>
          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>

        <input
          type="number"
          placeholder="Enter your CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none focus:border-cyan-400"
        />

        <button
          onClick={generateReport}
          className="w-full bg-cyan-500 hover:bg-cyan-400 rounded-xl py-4 font-semibold transition"
        >
          Generate Career Report
        </button>

      </div>

      <h2 className="text-3xl font-semibold mt-8">
        Hi {name} 👋
      </h2>

      <p className="text-lg mt-2">
        Degree: {degree}
      </p>

      <p className="text-lg">
        CGPA: {cgpa}
      </p>
      {showReport && (
  <div className="mt-8 w-full max-w-xl bg-zinc-900 rounded-xl p-6 border border-cyan-500">

    <h2 className="text-2xl font-bold mb-4">
      Career Report
    </h2>

    <div className="space-y-3">

  <div className="flex justify-between">
    <span className="text-zinc-400">👤 Name</span>
    <span>{name}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-zinc-400">🎓 Degree</span>
    <span>{degree}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-zinc-400">📊 CGPA</span>
    <span>{cgpa}</span>
  </div>

</div>

    <h3 className="mt-4 font-semibold">
      Recommended Careers
    </h3>

    <ul className="list-disc ml-6 mt-2 space-y-2">
  {careers.map((career) => (
    <li
    key={career}
    className="bg-zinc-800 rounded-lg p-3"
  >
    ⭐ {career}
  </li>
  ))}
</ul>

  </div>
)}
    </div>
  );
}

export default Assessment;