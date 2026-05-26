// src/components/Navbar.jsx
// Dark mode toggle included — persists to localStorage + applies to <html>

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── Sun icon ── */
const SunIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
      M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Moon icon ── */
const MoonIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Search icon ── */
const SearchIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Dark mode state ── */
  const [dark, setDark] = useState(() => {
    // Read from localStorage on first render
    try {
      const stored = localStorage.getItem("lz-theme");
      if (stored) return stored === "dark";
      // Respect OS preference as fallback
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  /* Apply / remove "dark" class on <html> whenever dark changes */
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("lz-theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  /* ── Dark mode toggle button ── */
  const DarkToggle = ({ mobile = false }) => (
    <button
      onClick={() => setDark((d) => !d)}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={dark ? "Light mode" : "Dark mode"}
      className={`
        relative flex items-center justify-center
        transition-all duration-200 active:scale-90
        ${
          mobile
            ? /* mobile: wider pill with label */
              `w-full flex items-center justify-between gap-2 px-4 py-3
             rounded-xl text-sm font-semibold
             ${
               dark
                 ? "bg-slate-700 text-yellow-300 border border-slate-600"
                 : "bg-stone-50 text-stone-700 border border-stone-200"
             }`
            : /* desktop: compact icon button */
              `w-9 h-9 rounded-xl
             ${
               dark
                 ? "bg-slate-700 text-yellow-300 hover:bg-slate-600 border border-slate-600"
                 : "bg-stone-100 text-stone-500 hover:bg-stone-200 border border-stone-200 hover:text-stone-800"
             }`
        }
      `}
    >
      {/* Animated icon swap */}
      <span className="flex items-center justify-center">
        <span
          className={`transition-all duration-300 ${dark ? "rotate-0 opacity-100" : "rotate-90 opacity-0 absolute"}`}
        >
          <SunIcon />
        </span>
        <span
          className={`transition-all duration-300 ${!dark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}
        >
          <MoonIcon />
        </span>
      </span>

      {/* Mobile label */}
      {mobile && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}

      {/* Mobile indicator dot */}
      {mobile && (
        <span
          className={`w-2 h-2 rounded-full ${dark ? "bg-yellow-400" : "bg-stone-300"}`}
        />
      )}
    </button>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? dark
              ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-slate-700/50"
              : "bg-white/96 backdrop-blur-xl shadow-sm border-b border-stone-100"
            : dark
              ? "bg-slate-900 border-b border-slate-700/60"
              : "bg-white border-b border-stone-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all
          duration-300 ${scrolled ? "h-14" : "h-16"}`}
        >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br
              from-indigo-600 to-violet-500 flex items-center justify-center
              text-white font-black text-base shadow-md shadow-indigo-500/30
              transition-transform hover:scale-105 duration-200"
            >
              L
            </div>
            <span
              className={`font-black text-xl tracking-tight hidden sm:block
              transition-colors duration-200
              ${dark ? "text-white" : "text-stone-900"}`}
            >
              LearnZone
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-xl text-sm font-semibold
                  transition-all duration-150
                  ${
                    isActive(l.to)
                      ? dark
                        ? "text-indigo-400 bg-indigo-500/15"
                        : "text-indigo-600 bg-indigo-50"
                      : dark
                        ? "text-slate-400 hover:text-white hover:bg-slate-800"
                        : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Search hint (desktop lg+) */}
            <button
              className={`hidden lg:flex items-center gap-2 text-xs
              rounded-full px-4 py-2 mr-1 transition-all duration-150
              ${
                dark
                  ? "bg-slate-800 border border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400"
                  : "bg-stone-50 border border-stone-200 text-stone-400 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              <SearchIcon />
              Search courses…
              <kbd
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono
                ${dark ? "bg-slate-700 text-slate-400" : "bg-stone-200 text-stone-500"}`}
              >
                ⌘K
              </kbd>
            </button>

            {/* Log In (desktop) */}
            <Link
              to="/login"
              className={`hidden sm:flex text-sm font-semibold px-3 py-2
                rounded-xl transition-colors duration-150
                ${
                  dark
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-indigo-600 hover:bg-stone-50"
                }`}
            >
              Log In
            </Link>

            {/* Sign up (desktop) */}
            <Link
              to="/login"
              className="hidden sm:flex items-center text-sm font-bold
                bg-gradient-to-r from-indigo-600 to-indigo-500 text-white
                px-5 py-2.5 rounded-full shadow-sm hover:shadow-md
                hover:shadow-indigo-500/30 hover:-translate-y-px
                transition-all duration-200"
            >
              Start Free
            </Link>

            {/* ── Dark mode toggle (desktop) ── */}
            <DarkToggle />

            {/* Avatar */}
            <Link
              to="/settings"
              className={`w-9 h-9 rounded-full flex items-center justify-center
                text-xs font-bold border-2 transition-all duration-200
                hover:scale-105
                ${
                  dark
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 hover:border-indigo-400"
                    : "bg-indigo-50 border-indigo-200 text-indigo-700 hover:border-indigo-400"
                }`}
              title="Account settings"
            >
              YO
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={`md:hidden w-9 h-9 flex flex-col items-center
                justify-center gap-1.5 rounded-xl transition-colors
                ${dark ? "hover:bg-slate-800" : "hover:bg-stone-100"}`}
            >
              <span
                className={`block w-5 h-0.5 transition-all duration-200
                ${dark ? "bg-slate-300" : "bg-stone-700"}
                ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-200
                ${dark ? "bg-slate-300" : "bg-stone-700"}
                ${open ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-200
                ${dark ? "bg-slate-300" : "bg-stone-700"}
                ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className={`md:hidden border-t px-4 py-3 space-y-1 shadow-lg
          transition-all
          ${
            dark
              ? "bg-slate-900 border-slate-700/60"
              : "bg-white border-stone-100"
          }`}
        >
          {/* Nav links */}
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center px-4 py-3 rounded-xl text-sm
                font-semibold transition-colors
                ${
                  isActive(l.to)
                    ? dark
                      ? "text-indigo-400 bg-indigo-500/15"
                      : "text-indigo-600 bg-indigo-50"
                    : dark
                      ? "text-slate-300 hover:text-white hover:bg-slate-800"
                      : "text-stone-700 hover:bg-stone-50"
                }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Dark mode toggle (mobile full-width) */}
          <div className="pt-1">
            <DarkToggle mobile />
          </div>

          {/* Auth buttons */}
          <div
            className={`pt-2 pb-1 border-t flex gap-2
            ${dark ? "border-slate-700/60" : "border-stone-100"}`}
          >
            <Link
              to="/login"
              className={`flex-1 text-center text-sm font-semibold py-2.5
                rounded-xl transition-colors border
                ${
                  dark
                    ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                    : "border-stone-200 text-stone-700 hover:border-indigo-300"
                }`}
            >
              Log In
            </Link>
            <Link
              to="/login"
              className="flex-1 text-center text-sm font-bold bg-indigo-600
                text-white py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
