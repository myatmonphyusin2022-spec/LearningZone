import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-6 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 bg-indigo-500 rounded-lg flex
                items-center justify-center text-white font-extrabold text-sm"
              >
                L
              </div>
              <span className="text-white text-lg font-extrabold font-heading">
                LearnZone
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The best platform to learn coding, design, and data science
              online. Start for free today and build a career you love.
            </p>
            <div className="flex gap-2 mt-5">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full
                  px-4 py-2 text-xs text-white placeholder:text-slate-500
                  outline-none focus:border-white/30"
              />
              <button
                className="bg-indigo-600 text-white text-xs font-semibold
                px-4 py-2 rounded-full hover:bg-indigo-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Learn</h4>
            <ul className="space-y-3">
              {[
                "All Courses",
                "Frontend Dev",
                "Backend Dev",
                "Data Science",
                "UI/UX Design",
              ].map((l) => (
                <li key={l}>
                  <Link
                    to="/courses"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Press Kit", "Partners"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Contact Us",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t border-slate-800 pt-6 flex items-center
          justify-between text-xs flex-wrap gap-3"
        >
          <span>© 2026 LearnZone. All rights reserved.</span>
          <div className="flex gap-3">
            {["𝕏", "in", "⌨", "▶", "f"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10
                  flex items-center justify-center hover:bg-indigo-600
                  hover:border-indigo-600 hover:text-white transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
