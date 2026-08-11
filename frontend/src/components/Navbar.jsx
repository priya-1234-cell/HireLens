import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Assessment", path: "/assessment" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-zinc-950 font-black">
            H
          </div>

          <span className="text-xl font-bold tracking-tight">
            Hire<span className="text-cyan-400">Lens</span>
          </span>

        </button>


        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-2">

          {links.map((link) => {

            const active = location.pathname === link.path;

            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            );
          })}

        </div>


        {/* CTA */}

        <button
          onClick={() => navigate("/assessment")}
          className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm transition"
        >
          Start Assessment
        </button>

      </div>

    </nav>
  );
}

export default Navbar;