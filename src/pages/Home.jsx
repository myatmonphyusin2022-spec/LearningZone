import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../data/courses";

const STATS = [
  { value: "12,000+", label: "Students enrolled" },
  { value: "50+", label: "Expert courses" },
  { value: "20+", label: "Top instructors" },
  { value: "98%", label: "Satisfaction rate" },
];

const TESTIMONIALS = [
  {
    quote:
      "LearnZone helped me land my first developer job at FPT in just 3 months. The React course is top-notch — practical, clear, and up-to-date.",
    name: "Minh Tran",
    role: "Frontend Dev @ FPT Software",
    initials: "MT",
    bg: "bg-blue-100",
    tc: "text-blue-700",
  },
  {
    quote:
      "The Python & Data Science course gave me exactly the skills I needed to switch careers from accounting. The projects are real-world and super practical.",
    name: "Linh Nguyen",
    role: "Data Analyst @ Momo",
    initials: "LN",
    bg: "bg-pink-100",
    tc: "text-pink-700",
  },
  {
    quote:
      "I completed 4 courses in 2 months while working full time. The Figma and UI/UX skills took me from zero to landing a design role at Tiki.",
    name: "Anh Pham",
    role: "UI/UX Designer @ Tiki",
    initials: "AP",
    bg: "bg-purple-100",
    tc: "text-purple-700",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "🔍",
    title: "1. Choose a Course",
    desc: "Browse 50+ expert-led courses across frontend, backend, data science, and design. Filter by level and category.",
  },
  {
    icon: "🎓",
    title: "2. Learn at Your Pace",
    desc: "Watch lessons, complete quizzes, and build real projects. Access everything anytime on any device.",
  },
  {
    icon: "🏆",
    title: "3. Earn Certificate",
    desc: "Complete the course and receive a verifiable certificate to share on LinkedIn and with employers.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = COURSES.slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="bg-gradient-to-br from-indigo-900 via-indigo-700
        to-indigo-500 text-white py-24 px-6 text-center relative overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-2 bg-white/10
            border border-white/20 text-indigo-200 text-xs font-semibold
            px-4 py-2 rounded-full mb-6 tracking-wider uppercase"
          >
            ✨ #1 E-Learning Platform in Vietnam
          </span>
          <h1 className="text-6xl font-extrabold leading-tight mb-5 font-heading">
            Learn Skills That{" "}
            <span className="text-yellow-400">Get You Hired</span>
          </h1>
          <p className="text-indigo-200 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Expert-led courses in coding, design, and data science. Self-paced,
            practical, and built for real careers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Button
              onClick={() => navigate("/courses")}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900
                font-bold px-10 py-4 rounded-full text-lg"
            >
              📚 Browse Courses
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="border-white/50 text-white hover:bg-white/10
                px-10 py-4 rounded-full text-lg"
            >
              📊 My Dashboard
            </Button>
          </div>
          <div
            className="flex items-center justify-center gap-8
            text-sm text-indigo-300 flex-wrap"
          >
            <span>
              ⭐ <strong className="text-white">4.8</strong> avg rating
            </span>
            <span>
              🎓 Certificate{" "}
              <strong className="text-white">on completion</strong>
            </span>
            <span>
              💚 <strong className="text-white">Free</strong> courses available
            </span>
            <span>
              👥 <strong className="text-white">12,000+</strong> students
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div
          className="max-w-5xl mx-auto grid grid-cols-4 divide-x
          divide-slate-200 text-center px-6"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-6">
              <div
                className="text-3xl font-extrabold text-indigo-600
                font-heading mb-1"
              >
                {s.value}
              </div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Courses ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Featured Courses
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handpicked by our expert instructors
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
            className="rounded-full border-indigo-200 text-indigo-600
              hover:bg-indigo-50"
          >
            See All Courses →
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {featured.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-white border-t border-b border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-extrabold text-slate-900 font-heading
            text-center mb-2"
          >
            Browse by Category
          </h2>
          <p className="text-slate-400 text-center text-sm mb-10">
            Find courses that match your career goals
          </p>
          <div className="grid grid-cols-4 gap-5">
            {[
              {
                icon: "💻",
                name: "Frontend Dev",
                count: "3 courses",
                color: "bg-blue-50   border-blue-200  text-blue-800",
                cat: "Frontend",
              },
              {
                icon: "⚙️",
                name: "Backend Dev",
                count: "1 course",
                color: "bg-green-50  border-green-200 text-green-800",
                cat: "Backend",
              },
              {
                icon: "📊",
                name: "Data Science",
                count: "1 course",
                color: "bg-pink-50   border-pink-200  text-pink-800",
                cat: "Data",
              },
              {
                icon: "🎨",
                name: "UI/UX Design",
                count: "1 course",
                color: "bg-purple-50 border-purple-200 text-purple-800",
                cat: "Design",
              },
            ].map((c) => (
              <div
                key={c.cat}
                onClick={() => navigate(`/courses?cat=${c.cat}`)}
                className={`${c.color} border-2 rounded-2xl p-8 text-center
                  cursor-pointer hover:-translate-y-1 transition-transform duration-200`}
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <div className={`text-base font-extrabold font-heading mb-1`}>
                  {c.name}
                </div>
                <div className="text-xs opacity-70">{c.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="text-3xl font-extrabold text-center text-slate-900
          font-heading mb-2"
        >
          How LearnZone Works
        </h2>
        <p className="text-slate-400 text-center text-sm mb-12">
          Three simple steps to change your career
        </p>
        <div className="grid grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.title} className="text-center px-6">
              <div
                className="w-16 h-16 bg-indigo-50 rounded-2xl flex
                items-center justify-center text-3xl mx-auto mb-5"
              >
                {item.icon}
              </div>
              <h3
                className="text-lg font-extrabold text-slate-900
                font-heading mb-3"
              >
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-extrabold text-center text-slate-900
            font-heading mb-2"
          >
            Student Success Stories
          </h2>
          <p className="text-slate-400 text-center text-sm mb-10">
            Real results from real learners
          </p>
          <div className="grid grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-slate-200
                rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="text-amber-400 text-xl">★★★★★</div>
                <p className="text-sm text-slate-600 leading-relaxed italic flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.bg} flex
                    items-center justify-center text-xs font-bold ${t.tc}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white font-heading mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-slate-400 text-base mb-10 leading-relaxed">
            Join 12,000+ students already on LearnZone. Free courses available —
            no credit card needed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate("/courses")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white
                px-10 rounded-full text-base py-4"
            >
              📚 Browse Free Courses
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10
                px-10 rounded-full text-base py-4"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
