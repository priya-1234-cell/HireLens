function Navbar() {
    return (
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold">
          Hire<span className="text-cyan-400">Lens</span>
        </h1>
  
        <div className="space-x-6">
          <button className="hover:text-cyan-400 transition">
            Login
          </button>
  
          <button className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-400 transition">
            Sign Up
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;