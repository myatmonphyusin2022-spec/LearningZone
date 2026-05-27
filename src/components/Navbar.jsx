// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── Icons ── */
const Sun = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      strokeLinecap="round"
    />
  </svg>
);
const Moon = () => (
  <svg
    width="16"
    height="16"
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
const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const ChevronDown = () => (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BellIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Mega menu data ── */
const COURSES_MENU = [
  {
    heading: "By Category",
    items: [
      {
        icon: "💻",
        label: "Frontend Dev",
        sub: "React, JS, CSS",
        to: "/courses?cat=Frontend",
      },
      {
        icon: "⚙️",
        label: "Backend Dev",
        sub: "Node.js, APIs, DB",
        to: "/courses?cat=Backend",
      },
      {
        icon: "📊",
        label: "Data Science",
        sub: "Python, ML, AI",
        to: "/courses?cat=Data",
      },
      {
        icon: "🎨",
        label: "UI/UX Design",
        sub: "Figma, UX Research",
        to: "/courses?cat=Design",
      },
    ],
  },
  {
    heading: "By Level",
    items: [
      {
        icon: "🌱",
        label: "Beginner",
        sub: "Start from scratch",
        to: "/courses?level=Beginner",
      },
      {
        icon: "🔥",
        label: "Intermediate",
        sub: "Level up your skills",
        to: "/courses?level=Intermediate",
      },
      {
        icon: "⚡",
        label: "Advanced",
        sub: "Production patterns",
        to: "/courses?level=Advanced",
      },
    ],
  },
  {
    heading: "Popular Now",
    items: [
      {
        icon: "⭐",
        label: "Top Rated",
        sub: "Highest rated courses",
        to: "/courses?sort=rat",
      },
      {
        icon: "🆓",
        label: "Free Courses",
        sub: "Start for free",
        to: "/courses?price=Free",
      },
      {
        icon: "🆕",
        label: "New Arrivals",
        sub: "Just released",
        to: "/courses",
      },
    ],
  },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false); // mobile
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false); // courses dropdown
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      const s = localStorage.getItem("lz-theme");
      if (s) return s === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });
  const [notifOpen, setNotifOpen] = useState(false);

  const megaRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  /* Apply data-theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    try {
      localStorage.setItem("lz-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  /* Scrolled shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close mobile on route change */
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setNotifOpen(false);
  }, [location]);

  /* Click outside closes menus */
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target))
        setMegaOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const NOTIFS = [
    {
      icon: "📚",
      text: "New lesson added to React for Beginners",
      time: "2m ago",
      unread: true,
    },
    {
      icon: "🏅",
      text: "You earned the UI/UX Design certificate!",
      time: "1h ago",
      unread: true,
    },
    {
      icon: "🔥",
      text: "Advanced React Patterns — 20% off today",
      time: "3h ago",
      unread: false,
    },
    {
      icon: "✅",
      text: "Quiz completed: 9/12 correct. Great job!",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <>
      {/* ════════════════════════════
          ANNOUNCEMENT BAR
      ════════════════════════════ */}
      <div
        className="hidden sm:flex items-center justify-center gap-3
        bg-gradient-to-r from-indigo-600 to-violet-600 text-white
        text-xs font-semibold py-2 px-4"
      >
        <span className="animate-pulse">🔥</span>
        <span>
          Limited time: Get 40% off all paid courses — use code{" "}
          <strong>LEARN40</strong>
        </span>
        <Link
          to="/courses"
          className="underline underline-offset-2 hover:no-underline opacity-90 hover:opacity-100"
        >
          Browse now →
        </Link>
      </div>

      {/* ════════════════════════════
          MAIN NAV
      ════════════════════════════ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--surface)",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: scrolled ? 56 : 64,
              transition: "height 0.3s ease",
            }}
          >
            {/* ── Logo ── */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: "0 4px 14px rgba(79,70,229,0.4)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "scale(1.08) rotate(-3deg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                L
              </div>
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 19,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
                className="hidden sm:block"
              >
                LearnZone
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Home */}
              <Link
                to="/"
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive("/") ? "var(--ind)" : "var(--text3)",
                  background: isActive("/") ? "var(--ind-ll)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "var(--surface2)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text3)";
                  }
                }}
              >
                Home
              </Link>

              {/* Courses — mega menu trigger */}
              <div ref={megaRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setMegaOpen(!megaOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    color: isActive("/courses") ? "var(--ind)" : "var(--text3)",
                    background:
                      isActive("/courses") || megaOpen
                        ? "var(--ind-ll)"
                        : "transparent",
                    color:
                      isActive("/courses") || megaOpen
                        ? "var(--ind)"
                        : "var(--text3)",
                    transition: "all 0.15s",
                  }}
                >
                  Courses
                  <span
                    style={{
                      transition: "transform 0.2s",
                      transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)",
                      display: "flex",
                    }}
                  >
                    <ChevronDown />
                  </span>
                </button>

                {/* Mega dropdown */}
                {megaOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--surface)",
                      border: "1.5px solid var(--border)",
                      borderRadius: 20,
                      padding: 24,
                      width: 640,
                      boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
                      animation: "fadeUp 0.2s ease forwards",
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 24,
                      zIndex: 200,
                    }}
                  >
                    {COURSES_MENU.map((col) => (
                      <div key={col.heading}>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "var(--text4)",
                            marginBottom: 12,
                          }}
                        >
                          {col.heading}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {col.items.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={() => setMegaOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "8px 10px",
                                borderRadius: 10,
                                textDecoration: "none",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                  "var(--ind-ll)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  "transparent")
                              }
                            >
                              <span
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 8,
                                  background: "var(--surface2)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 16,
                                  flexShrink: 0,
                                }}
                              >
                                {item.icon}
                              </span>
                              <div>
                                <p
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    marginBottom: 1,
                                  }}
                                >
                                  {item.label}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "var(--text4)",
                                  }}
                                >
                                  {item.sub}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Bottom promo strip */}
                    <div
                      style={{
                        gridColumn: "1/-1",
                        borderTop: "1px solid var(--border)",
                        paddingTop: 16,
                        marginTop: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background:
                          "linear-gradient(135deg, var(--ind-ll), var(--surface2))",
                        borderRadius: 12,
                        padding: "12px 16px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--ind)",
                          }}
                        >
                          🎉 6 Advanced courses just added!
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text3)" }}>
                          Microservices, ML, Security & more →
                        </p>
                      </div>
                      <Link
                        to="/courses?level=Advanced"
                        onClick={() => setMegaOpen(false)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 999,
                          background: "var(--ind)",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                          flexShrink: 0,
                        }}
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard */}
              <Link
                to="/dashboard"
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive("/dashboard") ? "var(--ind)" : "var(--text3)",
                  background: isActive("/dashboard")
                    ? "var(--ind-ll)"
                    : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/dashboard")) {
                    e.currentTarget.style.background = "var(--surface2)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/dashboard")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text3)";
                  }
                }}
              >
                Dashboard
              </Link>
            </nav>

            {/* ── Right actions ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {/* Expandable search */}
              <div ref={searchRef} style={{ position: "relative" }}>
                {searchOpen ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--surface2)",
                      border: "1.5px solid var(--ind)",
                      borderRadius: 999,
                      padding: "7px 14px",
                      boxShadow: "0 0 0 3px rgba(79,70,229,0.1)",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <SearchIcon />
                    <input
                      autoFocus
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search courses…"
                      style={{
                        width: 180,
                        border: "none",
                        background: "transparent",
                        fontSize: 13,
                        color: "var(--text)",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearch("");
                      }}
                      style={{
                        color: "var(--text4)",
                        fontSize: 16,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="hidden lg:flex"
                    style={{
                      alignItems: "center",
                      gap: 8,
                      background: "var(--surface2)",
                      border: "1.5px solid var(--border)",
                      borderRadius: 999,
                      padding: "7px 14px",
                      fontSize: 13,
                      color: "var(--text3)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--ind)";
                      e.currentTarget.style.color = "var(--ind)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text3)";
                    }}
                  >
                    <SearchIcon />
                    Search…
                    <kbd
                      style={{
                        fontSize: 10,
                        background: "var(--border)",
                        color: "var(--text4)",
                        padding: "2px 6px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                      }}
                    >
                      ⌘K
                    </kbd>
                  </button>
                )}
              </div>

              {/* Notifications bell */}
              <div ref={notifRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    border: "1.5px solid var(--border)",
                    background: notifOpen ? "var(--ind-ll)" : "var(--surface2)",
                    color: notifOpen ? "var(--ind)" : "var(--text3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--ind)";
                    e.currentTarget.style.color = "var(--ind)";
                  }}
                  onMouseLeave={(e) => {
                    if (!notifOpen) {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text3)";
                    }
                  }}
                >
                  <BellIcon />
                  {/* Unread dot */}
                  <span
                    style={{
                      position: "absolute",
                      top: 7,
                      right: 7,
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#ef4444",
                      border: "1.5px solid var(--surface)",
                    }}
                  />
                </button>

                {/* Notif dropdown */}
                {notifOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      width: 320,
                      background: "var(--surface)",
                      border: "1.5px solid var(--border)",
                      borderRadius: 16,
                      boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                      animation: "fadeUp 0.2s ease",
                      zIndex: 200,
                    }}
                  >
                    <div
                      style={{
                        padding: "14px 16px 10px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--text)",
                        }}
                      >
                        Notifications
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          background: "#ef4444",
                          color: "white",
                          padding: "2px 7px",
                          borderRadius: 999,
                        }}
                      >
                        2 new
                      </span>
                    </div>
                    {NOTIFS.map((n, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 12,
                          padding: "12px 16px",
                          borderBottom:
                            i < NOTIFS.length - 1
                              ? "1px solid var(--border)"
                              : "none",
                          background: n.unread
                            ? "var(--ind-ll)"
                            : "transparent",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--surface2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = n.unread
                            ? "var(--ind-ll)"
                            : "transparent")
                        }
                      >
                        <span
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "var(--surface2)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                          }}
                        >
                          {n.icon}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 12,
                              color: "var(--text)",
                              lineHeight: 1.5,
                              marginBottom: 2,
                            }}
                          >
                            {n.text}
                          </p>
                          <p style={{ fontSize: 11, color: "var(--text4)" }}>
                            {n.time}
                          </p>
                        </div>
                        {n.unread && (
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: "var(--ind)",
                              flexShrink: 0,
                              marginTop: 5,
                            }}
                          />
                        )}
                      </div>
                    ))}
                    <div
                      style={{
                        padding: "10px 16px",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <button
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: 10,
                          background: "var(--surface2)",
                          border: "none",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--ind)",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--ind-ll)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "var(--surface2)")
                        }
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={() => setDark((d) => !d)}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  border: "1.5px solid var(--border)",
                  background: "var(--surface2)",
                  color: dark ? "#fbbf24" : "var(--text3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ind)";
                  e.currentTarget.style.transform = "rotate(15deg) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    opacity: dark ? 1 : 0,
                    transform: dark
                      ? "scale(1) rotate(0deg)"
                      : "scale(0.4) rotate(-90deg)",
                  }}
                >
                  <Sun />
                </span>
                <span
                  style={{
                    position: "absolute",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    opacity: dark ? 0 : 1,
                    transform: dark
                      ? "scale(0.4) rotate(90deg)"
                      : "scale(1) rotate(0deg)",
                  }}
                >
                  <Moon />
                </span>
              </button>

              {/* Log in (desktop) */}
              <Link
                to="/login"
                className="hidden sm:block"
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text3)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--ind)";
                  e.currentTarget.style.background = "var(--ind-ll)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Log In
              </Link>

              {/* Sign up (desktop) */}
              <Link
                to="/login"
                className="hidden sm:block"
                style={{
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: "white",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(79,70,229,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(79,70,229,0.35)";
                }}
              >
                Start Free ✦
              </Link>

              {/* Avatar */}
              <Link
                to="/settings"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "2px solid var(--ind-l)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                YO
              </Link>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "1.5px solid var(--border)",
                  background: "var(--surface2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: 18,
                      height: 2,
                      background: "var(--text2)",
                      borderRadius: 2,
                      transition: "all 0.25s",
                      transform: open
                        ? i === 0
                          ? "rotate(45deg) translate(5px,5px)"
                          : i === 1
                            ? "scaleX(0)"
                            : "rotate(-45deg) translate(5px,-5px)"
                        : "none",
                      opacity: open && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            MOBILE MENU
        ════════════════════════════ */}
        {open && (
          <div
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
              padding: "12px 16px 16px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              animation: "fadeIn 0.2s ease",
            }}
          >
            {/* Mobile search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface2)",
                border: "1.5px solid var(--border)",
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 8,
              }}
            >
              <SearchIcon />
              <input
                placeholder="Search courses…"
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontSize: 14,
                  color: "var(--text)",
                  outline: "none",
                }}
              />
            </div>

            {/* Mobile links */}
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/courses", label: "📚 Courses" },
              { to: "/dashboard", label: "📊 Dashboard" },
              { to: "/settings", label: "⚙️ Settings" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  display: "block",
                  padding: "12px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: isActive(l.to) ? "var(--ind)" : "var(--text2)",
                  background: isActive(l.to) ? "var(--ind-ll)" : "transparent",
                  marginBottom: 2,
                  transition: "all 0.15s",
                }}
              >
                {l.label}
              </Link>
            ))}

            {/* Dark toggle — mobile */}
            <button
              onClick={() => setDark((d) => !d)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text2)",
                cursor: "pointer",
                marginTop: 4,
                marginBottom: 8,
                transition: "all 0.2s",
              }}
            >
              <span>{dark ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
              {/* Track */}
              <span
                style={{
                  display: "inline-flex",
                  width: 44,
                  height: 24,
                  borderRadius: 999,
                  background: dark ? "var(--ind)" : "var(--border2)",
                  position: "relative",
                  transition: "background 0.3s",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: dark ? "translateX(20px)" : "translateX(0px)",
                  }}
                />
              </span>
            </button>

            {/* Auth buttons */}
            <div
              style={{
                display: "flex",
                gap: 8,
                paddingTop: 8,
                borderTop: "1px solid var(--border)",
              }}
            >
              <Link
                to="/login"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  border: "1.5px solid var(--border)",
                  color: "var(--text2)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                Log In
              </Link>
              <Link
                to="/login"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
