function DashboardPreview() {
    return (
      <div className="mt-16 w-full max-w-5xl rounded-3xl border border-zinc-700 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">
  
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">
            AI Career Dashboard
          </h2>
  
          <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm">
            Online
          </span>
        </div>
  
        <div className="grid grid-cols-3 gap-6">

  {/* Career Match */}
  <div className="bg-zinc-800/70 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 hover:border-cyan-400 hover:scale-105 transition duration-300">
    <p className="text-zinc-400 text-sm">Career Match</p>
    <h1 className="text-4xl font-bold mt-4 text-cyan-400">96%</h1>

    <div className="w-full bg-zinc-700 rounded-full h-2 mt-5">
      <div className="bg-cyan-400 h-2 rounded-full w-[96%]"></div>
    </div>
  </div>

  {/* Skills */}
  <div className="bg-zinc-800/70 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 hover:border-purple-400 hover:scale-105 transition duration-300">
    <p className="text-zinc-400 text-sm">Skills Completed</p>
    <h1 className="text-4xl font-bold mt-4 text-purple-400">18/25</h1>

    <div className="w-full bg-zinc-700 rounded-full h-2 mt-5">
      <div className="bg-purple-400 h-2 rounded-full w-[72%]"></div>
    </div>
  </div>

  {/* Placement */}
  <div className="bg-zinc-800/70 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 hover:border-green-400 hover:scale-105 transition duration-300">
    <p className="text-zinc-400 text-sm">Placement Score</p>
    <h1 className="text-4xl font-bold mt-4 text-green-400">88%</h1>

    <div className="w-full bg-zinc-700 rounded-full h-2 mt-5">
      <div className="bg-green-400 h-2 rounded-full w-[88%]"></div>
    </div>
  </div>

        </div>
      </div>
    );
  }
  
  export default DashboardPreview;