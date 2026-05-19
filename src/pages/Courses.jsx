// src/pages/Courses.jsx  — Full responsive with Advanced tab
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../data/courses";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const CATS = ["All", "Frontend", "Backend", "Data", "Design"];
const PRICES = ["All", "Free", "Paid"];

/* Level tab colors */
const LEVEL_TAB = {
  All: { active: "bg-stone-900 text-white", dot: "" },
  Beginner: { active: "bg-green-600 text-white", dot: "bg-green-400" },
  Intermediate: { active: "bg-amber-500 text-white", dot: "bg-amber-300" },
  Advanced: { active: "bg-rose-600 text-white", dot: "bg-rose-300" },
};

/* Advanced course features list */
const ADV_FEATURES = [
  { icon: "⚡", label: "Production-grade content" },
  { icon: "🏗️", label: "Real architecture patterns" },
  { icon: "🔬", label: "Deep technical deep-dives" },
  { icon: "🎯", label: "Interview-ready skills" },
];

export default function Courses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("");
  const [view, setView] = useState("grid"); // "grid" | "list"

  /* Read ?cat=Frontend from URL */
  useEffect(() => {
    const c = searchParams.get("cat");
    if (c && CATS.includes(c)) setCat(c);
    const l = searchParams.get("level");
    if (l && LEVELS.includes(l)) setLevel(l);
  }, [searchParams]);

  /* Filtered + sorted courses */
  const filtered = useMemo(() => {
    let list = COURSES.filter((c) => {
      const mCat = cat === "All" || c.category === cat;
      const mLvl = level === "All" || c.level === level;
      const mPrice =
        price === "All" ||
        (price === "Free" && c.price === 0) ||
        (price === "Paid" && c.price > 0);
      const q = search.toLowerCase();
      const mQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q));
      return mCat && mLvl && mPrice && mQ;
    });
    if (sort === "rat") return [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "pop")
      return [...list].sort((a, b) => b.students - a.students);
    if (sort === "pl") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "ph") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, cat, level, price, sort]);

  const hasFilters =
    search || cat !== "All" || level !== "All" || price !== "All" || sort;

  function reset() {
    setSearch("");
    setCat("All");
    setLevel("All");
    setPrice("All");
    setSort("");
  }

  /* Counts per level for badges */
  const counts = useMemo(() => {
    const base = COURSES.filter(
      (c) =>
        (cat === "All" || c.category === cat) &&
        (price === "All" ||
          (price === "Free" && c.price === 0) ||
          (price === "Paid" && c.price > 0)),
    );
    return {
      All: base.length,
      Beginner: base.filter((c) => c.level === "Beginner").length,
      Intermediate: base.filter((c) => c.level === "Intermediate").length,
      Advanced: base.filter((c) => c.level === "Advanced").length,
    };
  }, [cat, price]);

  /* ── small reusable filter pill ── */
  function FPill({ label, active, onClick, dark = false }) {
    return (
      <button
        onClick={onClick}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold
          border transition-all duration-150 whitespace-nowrap
          ${
            active && !dark
              ? "bg-brand-600 text-white border-brand-600 shadow-sm"
              : active && dark
                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:border-brand-300 hover:text-brand-600"
          }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ══════════════════════════════
          PAGE BANNER
      ══════════════════════════════ */}
      <div
        className="relative bg-gradient-to-br from-stone-950
        via-brand-900 to-brand-700 overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-500/15 rounded-full blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p
            className="text-xs font-bold text-brand-300 uppercase
            tracking-widest mb-4 font-body"
          >
            📚 Course Library
          </p>
          <h1
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl
            text-white mb-4 leading-tight tracking-tighter"
          >
            All <span className="italic text-yellow-300">Courses</span>
          </h1>
          <p
            className="text-brand-200 text-base sm:text-lg max-w-xl
            leading-relaxed mb-10 font-body"
          >
            Expert-led, project-based courses for every skill level — from
            beginner to advanced.
          </p>

          {/* Inline search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4
                text-brand-300 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses, instructors, topics..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10
                  backdrop-blur-sm border border-white/20 text-white
                  placeholder:text-brand-300 outline-none text-sm font-body
                  focus:bg-white/20 focus:border-white/40 transition-all"
              />
            </div>
            <button
              onClick={() => {}}
              className="px-8 py-3.5 bg-white text-brand-700 font-bold
                text-sm rounded-2xl hover:bg-brand-50 transition-colors
                whitespace-nowrap font-body"
            >
              Search Courses
            </button>
          </div>

          {/* Quick stats strip */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-brand-300 font-body">
            <span>
              🎓 <strong className="text-white">{COURSES.length}</strong> Total
              courses
            </span>
            <span>
              💚{" "}
              <strong className="text-white">
                {COURSES.filter((c) => c.price === 0).length}
              </strong>{" "}
              Free
            </span>
            <span>
              ⭐ <strong className="text-white">4.8</strong> Avg rating
            </span>
            <span>
              🏆 <strong className="text-white">6</strong> Advanced courses
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          LEVEL TABS (big visual tabs)
      ══════════════════════════════ */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 -mb-px">
            {LEVELS.map((lv) => {
              const isActive = level === lv;
              const styles = LEVEL_TAB[lv];
              return (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`group relative flex items-center gap-2 px-5 py-4
                    text-sm font-semibold whitespace-nowrap border-b-2
                    transition-all duration-200 font-body shrink-0
                    ${
                      isActive
                        ? "border-brand-600 text-brand-700"
                        : "border-transparent text-stone-500 hover:text-stone-900 hover:border-stone-300"
                    }`}
                >
                  {lv === "Advanced" && <span className="text-base">⚡</span>}
                  {lv}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold
                    font-body transition-colors
                    ${
                      isActive
                        ? "bg-brand-100 text-brand-700"
                        : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                    }`}
                  >
                    {counts[lv]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          ADVANCED HERO BANNER
          (shows only when Advanced tab active)
      ══════════════════════════════ */}
      {level === "Advanced" && (
        <div
          className="bg-gradient-to-r from-rose-950 via-rose-900 to-red-800
          border-b border-rose-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div
              className="flex flex-col md:flex-row items-start
              md:items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚡</span>
                  <span
                    className="text-xs font-bold uppercase tracking-widest
                    text-rose-300 font-body"
                  >
                    Advanced Track
                  </span>
                </div>
                <h2
                  className="font-display font-black text-2xl sm:text-3xl
                  text-white mb-2 tracking-tight"
                >
                  For Experienced Developers
                </h2>
                <p className="text-rose-200 text-sm max-w-xl leading-relaxed font-body">
                  These courses assume solid fundamentals. Expect deep-dives
                  into production patterns, architecture decisions, and
                  real-world complexity used at Vietnam's top tech companies.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {ADV_FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 bg-white/10
                      border border-white/15 rounded-xl px-3 py-2"
                  >
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-xs text-rose-100 font-semibold font-body">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          FILTER BAR
      ══════════════════════════════ */}
      <div
        className="bg-white border-b border-stone-100 shadow-xs
        sticky top-16 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category pills */}
            <div className="flex gap-1.5 flex-wrap items-center">
              <span
                className="text-xs text-stone-400 font-semibold
                font-body hidden sm:block"
              >
                Category:
              </span>
              {CATS.map((c) => (
                <FPill
                  key={c}
                  label={c}
                  active={cat === c}
                  onClick={() => setCat(c)}
                />
              ))}
            </div>

            <div className="w-px h-5 bg-stone-200 mx-1 hidden lg:block" />

            {/* Price pills */}
            <div className="flex gap-1.5 flex-wrap items-center">
              <span
                className="text-xs text-stone-400 font-semibold
                font-body hidden sm:block"
              >
                Price:
              </span>
              {PRICES.map((p) => (
                <FPill
                  key={p}
                  label={p}
                  active={price === p}
                  onClick={() => setPrice(p)}
                />
              ))}
            </div>

            {/* Spacer + right controls */}
            <div className="ml-auto flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border border-stone-200 rounded-full
                  px-3 py-1.5 text-stone-600 outline-none cursor-pointer
                  hover:border-brand-300 transition-colors font-body bg-white"
              >
                <option value="">Sort: Default</option>
                <option value="rat">Highest Rated</option>
                <option value="pop">Most Popular</option>
                <option value="pl">Price: Low → High</option>
                <option value="ph">Price: High → Low</option>
              </select>

              {/* View toggle */}
              <div
                className="flex border border-stone-200 rounded-lg
                overflow-hidden"
              >
                {[
                  ["grid", "⊞"],
                  ["list", "☰"],
                ].map(([v, icon]) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    title={v + " view"}
                    className={`px-2.5 py-1.5 text-sm transition-colors
                      ${
                        view === v
                          ? "bg-brand-600 text-white"
                          : "bg-white text-stone-400 hover:text-stone-700"
                      }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          CONTENT
      ══════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Results info row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-stone-500 font-body">
            Showing{" "}
            <strong className="text-stone-900 font-bold">
              {filtered.length}
            </strong>{" "}
            course{filtered.length !== 1 ? "s" : ""}
            {level !== "All" && (
              <span className="ml-1 text-stone-400">
                in <strong className="text-stone-700">{level}</strong>
              </span>
            )}
            {cat !== "All" && (
              <span className="ml-1 text-stone-400">
                · <strong className="text-stone-700">{cat}</strong>
              </span>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={reset}
              className="text-xs font-bold text-brand-600 hover:text-brand-800
                flex items-center gap-1 font-body transition-colors"
            >
              <span>✕</span> Clear all filters
            </button>
          )}
        </div>

        {/* Course grid or list */}
        {filtered.length > 0 ? (
          view === "grid" ? (
            <div
              className={`grid gap-5
              ${
                level === "Advanced"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          ) : (
            /* List view */
            <div className="space-y-3">
              {filtered.map((c) => (
                <ListCard key={c.id} course={c} navigate={navigate} />
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div className="text-center py-32">
            <div className="text-7xl mb-6 animate-bounce-slow">🔍</div>
            <h3
              className="font-display font-bold text-2xl text-stone-700 mb-3
              tracking-tight"
            >
              No courses found
            </h3>
            <p
              className="text-stone-400 text-sm mb-8 max-w-xs mx-auto
              leading-relaxed font-body"
            >
              Try adjusting your search term, category, or level filter.
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-full border-2 border-brand-200
                text-brand-600 font-bold text-sm hover:bg-brand-50
                transition-colors font-body"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Advanced CTA block (bottom of advanced tab) */}
        {level === "Advanced" && filtered.length > 0 && (
          <div
            className="mt-16 relative bg-gradient-to-br from-stone-950
            to-brand-900 rounded-3xl p-8 sm:p-12 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 60%)",
              }}
            />
            <div
              className="relative z-10 flex flex-col md:flex-row
              items-start md:items-center justify-between gap-6"
            >
              <div>
                <p
                  className="text-xs font-bold text-brand-300 uppercase
                  tracking-widest mb-2 font-body"
                >
                  Advanced Learning Path
                </p>
                <h3
                  className="font-display font-black text-2xl sm:text-3xl
                  text-white mb-3 tracking-tight"
                >
                  Master the full stack.
                  <br />
                  <span className="text-yellow-300 italic">
                    Land senior roles.
                  </span>
                </h3>
                <p className="text-stone-300 text-sm max-w-md leading-relaxed font-body">
                  Our Advanced track is designed to take you from mid-level to
                  senior engineer. Real production patterns, real architecture,
                  real interview prep.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-white text-stone-900 font-bold
                    rounded-2xl text-sm hover:bg-stone-100 transition-colors
                    whitespace-nowrap font-body"
                >
                  🚀 Explore All Advanced
                </button>
                <button
                  onClick={() => setLevel("All")}
                  className="px-8 py-4 bg-white/10 border border-white/20
                    text-white font-semibold rounded-2xl text-sm
                    hover:bg-white/20 transition-colors whitespace-nowrap
                    font-body"
                >
                  View All Levels
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── List view card ── */
function ListCard({ course, navigate }) {
  const disc = Math.round((1 - course.price / course.origPrice) * 100);
  const LVL_COLORS = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-rose-100 text-rose-700",
  };

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white border border-stone-100 rounded-2xl p-5
        flex gap-5 items-start cursor-pointer group
        hover:border-brand-200 hover:shadow-card transition-all duration-200"
    >
      {/* Emoji */}
      <div
        className={`w-14 h-14 rounded-2xl ${course.bgLight} flex
        items-center justify-center text-2xl shrink-0 mt-0.5`}
      >
        {course.emoji}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full
            ${LVL_COLORS[course.level]}`}
          >
            {course.level}
          </span>
          {(course.tags || []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs bg-stone-100 text-stone-500
              px-2 py-0.5 rounded-full font-body"
            >
              {t}
            </span>
          ))}
        </div>

        <h3
          className="font-display font-bold text-stone-900 text-base
          leading-snug mb-1 group-hover:text-brand-600 transition-colors
          tracking-tight"
        >
          {course.title}
        </h3>

        <p className="text-xs text-stone-400 mb-2 font-body">
          by{" "}
          <span className="text-stone-600 font-semibold">
            {course.instructor}
          </span>{" "}
          · {course.instructorRole}
        </p>

        <p
          className="text-xs text-stone-500 line-clamp-2 leading-relaxed
          mb-3 font-body max-w-2xl"
        >
          {course.desc}
        </p>

        <div className="flex items-center gap-4 text-xs text-stone-400 font-body flex-wrap">
          <span>📚 {course.lessons} lessons</span>
          <span>⏱ {course.duration}</span>
          <span className="text-amber-500 font-semibold">
            ⭐ {course.rating}
          </span>
          <span>👥 {course.students.toLocaleString()}</span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="shrink-0 text-right flex flex-col items-end gap-2">
        <div>
          <div
            className={`font-display font-bold text-xl
            ${course.price === 0 ? "text-green-600" : "text-brand-600"}`}
          >
            {course.price === 0 ? "Free" : `${course.price.toLocaleString()}đ`}
          </div>
          {course.price > 0 && (
            <div className="text-xs text-stone-400 line-through font-body">
              {course.origPrice.toLocaleString()}đ
            </div>
          )}
          {course.price > 0 && (
            <div className="text-xs font-bold text-rose-600 font-body">
              -{disc}% off
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courses/${course.id}`);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold text-white
            bg-gradient-to-r ${course.color} hover:opacity-90
            transition-opacity shadow-sm font-body`}
        >
          View Course →
        </button>
      </div>
    </div>
  );
}
