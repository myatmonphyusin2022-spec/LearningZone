// src/components/Navbar.jsx — modern font update
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/96 backdrop-blur-xl shadow-sm border-b border-stone-100"
          : "bg-white border-b border-stone-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all
          duration-300 ${scrolled ? "h-14" : "h-16"}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br
              from-brand-600 to-brand-500 flex items-center justify-center
              text-white font-display font-black text-base shadow-md
              shadow-brand-500/25"
            >
              L
            </div>
            <span
              className="font-display font-black text-xl text-stone-900
              tracking-tight hidden sm:block"
            >
              LearnZone
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-xl text-sm font-semibold
                  font-body transition-all duration-150
                  ${
                    isActive(l.to)
                      ? "text-brand-600 bg-brand-50"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Search hint */}
            <button
              className="hidden lg:flex items-center gap-2.5 text-xs
              text-stone-400 bg-stone-50 border border-stone-200 rounded-full
              px-4 py-2 hover:border-brand-300 hover:text-brand-600
              transition-all duration-150 font-body mr-1"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              Search courses…
              <kbd
                className="text-[10px] bg-stone-200 text-stone-500
                px-1.5 py-0.5 rounded font-mono"
              >
                ⌘K
              </kbd>
            </button>

            <Link
              to="/dashboard"
              className="hidden sm:flex text-sm font-semibold text-stone-600
                hover:text-brand-600 px-3 py-2 rounded-xl hover:bg-stone-50
                transition-colors font-body"
            >
              Log In
            </Link>

            <Link
              to="/courses"
              className="hidden sm:flex items-center text-sm font-bold
                bg-gradient-to-r from-brand-600 to-brand-500 text-white
                px-5 py-2.5 rounded-full shadow-sm hover:shadow-md
                hover:shadow-brand-500/25 hover:-translate-y-px
                transition-all duration-200 font-body"
            >
              Start Free
            </Link>

            {/* Avatar */}
            <Link
              to="/dashboard"
              className="w-9 h-9 rounded-full bg-brand-100 border-2
                border-brand-200 flex items-center justify-center
                text-xs font-bold text-brand-700 font-body
                hover:border-brand-400 transition-colors"
            >
              YO
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex flex-col items-center
                justify-center gap-1.5 rounded-xl hover:bg-stone-100
                transition-colors"
            >
              <span
                className={`block w-5 h-0.5 bg-stone-700 transition-all
                duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-stone-700 transition-all
                duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-stone-700 transition-all
                duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-stone-100 bg-white
          px-4 py-3 space-y-1 animate-fade-in shadow-md"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center px-4 py-3 rounded-xl text-sm
                font-semibold font-body transition-colors
                ${
                  isActive(l.to)
                    ? "text-brand-600 bg-brand-50"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 pb-1 border-t border-stone-100 flex gap-2">
            <Link
              to="/dashboard"
              className="flex-1 text-center text-sm font-semibold font-body
                border border-stone-200 text-stone-700 py-2.5 rounded-xl
                hover:border-brand-300 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/courses"
              className="flex-1 text-center text-sm font-bold font-body
                bg-brand-600 text-white py-2.5 rounded-xl
                hover:bg-brand-700 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
