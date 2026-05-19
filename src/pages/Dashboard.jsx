import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "../components/ProgressBar";
import { COURSES, ACTIVITIES } from "../data/courses";

const enrolled = COURSES.filter((c) => c.progress > 0);
const completed = enrolled.filter((c) => c.progress === 100);
const inProgress = enrolled.filter((c) => c.progress > 0 && c.progress < 100);

const STATS = [
  { icon: "📚", value: enrolled.length, label: "Enrolled" },
  { icon: "🎓", value: completed.length, label: "Completed" },
  { icon: "▶️", value: inProgress.length, label: "In Progress" },
  { icon: "🏆", value: completed.length, label: "Certificates" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div
        className="bg-gradient-to-br from-indigo-950 to-indigo-800
        text-white py-14 px-6"
      >
        <div
          className="max-w-5xl mx-auto flex items-center
          justify-between gap-5 flex-wrap"
        >
          <div>
            <p className="text-indigo-300 text-sm font-semibold mb-2">
              Welcome back 👋
            </p>
            <h1 className="text-4xl font-extrabold font-heading mb-2">
              My Dashboard
            </h1>
            <p className="text-indigo-300 text-sm">
              Track your progress and keep learning every day
            </p>
          </div>
          <div
            className="bg-white/10 border border-white/20 rounded-2xl
            px-8 py-5 text-center"
          >
            <div className="text-4xl font-extrabold font-heading">420</div>
            <div className="text-indigo-300 text-xs mt-1">XP Points Earned</div>
            <div className="text-indigo-200 text-xs mt-1">
              ⭐ Level 3 Learner
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 pb-20">
        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-200
              rounded-2xl p-6 text-center hover:border-indigo-200
              transition-colors"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div
                className="text-3xl font-extrabold text-indigo-600
                font-heading"
              >
                {s.value}
              </div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-6">
          {/* Left */}
          <div>
            {/* Enrolled courses */}
            <div
              className="bg-white border border-slate-200 rounded-2xl
              p-6 mb-5"
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-lg font-extrabold text-slate-900
                  font-heading"
                >
                  📚 My Enrolled Courses
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-indigo-200 text-indigo-600
                    text-xs hover:bg-indigo-50"
                  onClick={() => navigate("/courses")}
                >
                  + Explore More
                </Button>
              </div>
              <div className="divide-y divide-slate-100">
                {enrolled.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-4
                    py-5 first:pt-0 last:pb-0"
                  >
                    <div className="text-3xl shrink-0">{c.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-bold text-slate-900
                        mb-1 truncate"
                      >
                        {c.title}
                      </div>
                      <div className="text-xs text-slate-400 mb-2">
                        by {c.instructor} · {c.lessons} lessons · {c.duration}
                      </div>
                      <div className="flex items-center gap-3">
                        <ProgressBar value={c.progress} className="flex-1" />
                        <span
                          className="text-xs text-slate-400 w-9
                          text-right shrink-0"
                        >
                          {c.progress}%
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`rounded-full text-xs shrink-0
                        ${
                          c.progress === 100
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } text-white`}
                      onClick={() => navigate(`/courses/${c.id}`)}
                    >
                      {c.progress === 100 ? "Review" : "Continue"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div
              className="bg-white border border-slate-200
              rounded-2xl p-6"
            >
              <h2
                className="text-lg font-extrabold text-slate-900
                font-heading mb-5"
              >
                ✅ Recent Activity
              </h2>
              <div className="space-y-4">
                {ACTIVITIES.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full bg-indigo-500
                      mt-2 shrink-0"
                    />
                    <div>
                      <div className="text-sm text-slate-700 leading-snug">
                        {a.text}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {a.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* Certificates */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2
                className="text-lg font-extrabold text-slate-900
                font-heading mb-4"
              >
                🏆 Certificates
              </h2>
              {completed.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {completed.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3
                      py-3 first:pt-0 last:pb-0"
                    >
                      <div className="text-2xl">🏅</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-800">
                          {c.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          Verified · Earned
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">
                  🎓 Complete a course to earn your first certificate!
                </p>
              )}
              <Button
                variant="outline"
                className="w-full mt-4 rounded-xl
                text-xs border-slate-200 text-slate-600"
              >
                View All Certificates
              </Button>
            </div>

            {/* Weekly goal */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2
                className="text-lg font-extrabold text-slate-900
                font-heading mb-4"
              >
                📈 Weekly Goal
              </h2>
              <div className="text-center mb-4">
                <div
                  className="text-4xl font-extrabold text-indigo-600
                  font-heading"
                >
                  3/5
                </div>
                <div className="text-xs text-slate-400 mt-1 mb-4">
                  Lessons this week
                </div>
                <ProgressBar value={60} />
                <div className="text-xs text-slate-400 mt-2">
                  60% of weekly goal ⚡
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2
                className="text-lg font-extrabold text-slate-900
                font-heading mb-4"
              >
                ⚡ Quick Actions
              </h2>
              <div className="space-y-3">
                <Button
                  className="w-full rounded-xl bg-indigo-600
                    hover:bg-indigo-700 text-white text-sm"
                  onClick={() => navigate("/courses")}
                >
                  🔍 Find New Course
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl
                  border-indigo-200 text-indigo-600 text-sm"
                >
                  🧠 Take a Practice Quiz
                </Button>
                <Button
                  variant="ghost"
                  className="w-full rounded-xl
                  text-slate-600 text-sm"
                >
                  👥 Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore banner */}
        <div
          className="bg-indigo-50 border border-indigo-100 rounded-2xl
          p-10 text-center mt-6"
        >
          <h3
            className="text-2xl font-extrabold text-indigo-900
            font-heading mb-2"
          >
            Keep the momentum going! ✨
          </h3>
          <p className="text-indigo-500 text-sm mb-6">
            Explore more courses to unlock new skills and advance your career.
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white
              rounded-full px-10"
            onClick={() => navigate("/courses")}
          >
            Browse All Courses →
          </Button>
        </div>
      </div>
    </div>
  );
}
