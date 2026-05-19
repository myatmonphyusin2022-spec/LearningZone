import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProgressBar from "../components/ProgressBar";
import { COURSES } from "../data/courses";

const CAT_COLORS = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-green-100 text-green-800",
  Data: "bg-pink-100 text-pink-800",
  Design: "bg-purple-100 text-purple-800",
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === Number(id));
  const [openLesson, setOpenLesson] = useState(null);

  if (!course)
    return (
      <div className="text-center py-24">
        <p className="text-2xl font-bold text-slate-700 mb-4">
          Course not found
        </p>
        <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );

  const disc = Math.round((1 - course.price / course.origPrice) * 100);
  const btnLabel =
    course.progress === 0
      ? "🚀 Enroll Now"
      : course.progress === 100
        ? "📖 Review Course"
        : "▶️ Continue Learning";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pb-20">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-indigo-600
          font-semibold mb-8 hover:gap-2 transition-all"
      >
        ← Back to Courses
      </button>

      <div className="grid grid-cols-[1fr_360px] gap-12 items-start">
        {/* ── Left Column ── */}
        <div>
          <div className="text-6xl mb-4">{course.emoji}</div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full
            ${CAT_COLORS[course.category]}`}
          >
            {course.category}
          </span>

          <h1
            className="text-4xl font-extrabold text-slate-900 mt-3 mb-2
            leading-tight font-heading"
          >
            {course.title}
          </h1>
          <p className="text-slate-400 text-sm mb-5">
            Instructor:{" "}
            <strong className="text-slate-600">{course.instructor}</strong>
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-5 text-sm text-slate-500
            bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 mb-6"
          >
            <span>⭐ {course.rating} rating</span>
            <span>👥 {course.students.toLocaleString()} students</span>
            <span>⏱ {course.duration}</span>
            <span>📚 {course.lessons} lessons</span>
            <span>🏆 {course.level}</span>
            <span>🌐 Vietnamese / English</span>
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-10">
            {course.description}
          </p>

          {/* Topics */}
          <h2 className="text-xl font-extrabold text-slate-900 font-heading mb-5">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {course.topics.map((topic) => (
              <div
                key={topic}
                className="flex items-start gap-3
                bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
              >
                <div
                  className="w-5 h-5 rounded-full bg-indigo-100 flex
                  items-center justify-center text-indigo-600 text-xs
                  font-bold mt-0.5 shrink-0"
                >
                  ✓
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {topic}
                </span>
              </div>
            ))}
          </div>

          {/* Lessons */}
          <h2 className="text-xl font-extrabold text-slate-900 font-heading mb-2">
            Course Curriculum
          </h2>
          <p className="text-slate-400 text-sm mb-5">
            {course.lessons} lessons · {course.duration} · Click to expand
          </p>
          <div className="space-y-2 mb-10">
            {course.topics.map((topic, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-xl
                overflow-hidden"
              >
                <button
                  onClick={() => setOpenLesson(openLesson === i ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-4
                    hover:bg-slate-50 transition-colors text-left"
                >
                  <div
                    className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600
                    text-xs font-bold flex items-center justify-center shrink-0"
                  >
                    {i + 1}
                  </div>
                  <span className="flex-1 text-sm font-semibold text-slate-800">
                    {topic}
                  </span>
                  <span className="text-xs text-slate-400">
                    {course.lessonDurations[i]} min
                  </span>
                  <span className="text-sm ml-1">
                    {course.progress > ((i + 1) / course.topics.length) * 100
                      ? "✅"
                      : i === 0 && course.progress > 0
                        ? "🔄"
                        : "🔒"}
                  </span>
                  <span className="text-slate-400 text-xs ml-1">
                    {openLesson === i ? "▲" : "▼"}
                  </span>
                </button>
                {openLesson === i && (
                  <div
                    className="px-16 py-4 text-sm text-slate-500
                    leading-relaxed border-t border-slate-100 bg-slate-50"
                  >
                    {course.lessonDesc[i]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instructor */}
          <h2 className="text-xl font-extrabold text-slate-900 font-heading mb-5">
            About the Instructor
          </h2>
          <div
            className="flex gap-5 bg-slate-50 border border-slate-200
            rounded-2xl p-6 mb-10"
          >
            <div
              className="w-16 h-16 rounded-full bg-indigo-100 flex
              items-center justify-center text-xl font-extrabold text-indigo-600
              shrink-0 font-heading"
            >
              {course.instructor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div
                className="text-lg font-extrabold text-slate-900
                font-heading mb-1"
              >
                {course.instructor}
              </div>
              <div className="text-sm text-slate-400 mb-3">
                Senior {course.category} Engineer · 8+ years experience
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.instructor} is a senior engineer with 8+ years of
                experience building production products at top tech companies in
                Vietnam and internationally. Their teaching style is practical
                and project-based.
              </p>
            </div>
          </div>
        </div>

        {/* ── Enroll Sidebar ── */}
        <div
          className="bg-white rounded-2xl border border-slate-200
          shadow-md p-7 sticky top-20"
        >
          {course.price === 0 ? (
            <div>
              <div
                className="text-4xl font-extrabold text-green-600
                font-heading mb-1"
              >
                Free
              </div>
              <div className="text-sm text-slate-400 mb-4">
                Originally {course.origPrice.toLocaleString()}đ — 100% off!
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-indigo-600 font-heading">
                  {course.price.toLocaleString()}đ
                </span>
                <span
                  className="bg-amber-100 text-amber-800 text-xs font-bold
                  px-2.5 py-1 rounded-full"
                >
                  {disc}% OFF
                </span>
              </div>
              <div className="text-sm text-slate-400 line-through">
                {course.origPrice.toLocaleString()}đ
              </div>
            </div>
          )}

          {course.progress > 0 && (
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Your progress</span>
                <span>{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} />
            </div>
          )}

          <Button
            className={`w-full rounded-xl py-3 text-sm font-bold mb-3
              ${
                course.progress === 100
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
          >
            {btnLabel}
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-xl mb-5 text-slate-600
              border-slate-200 hover:bg-slate-50"
          >
            ♡ Add to Wishlist
          </Button>

          {/* Rating */}
          <div
            className="flex items-center gap-3 bg-slate-50 rounded-xl
            border border-slate-100 p-4 mb-5"
          >
            <div className="text-3xl font-extrabold text-slate-900 font-heading">
              {course.rating}
            </div>
            <div>
              <div className="text-amber-400 text-lg">⭐⭐⭐⭐⭐</div>
              <div className="text-xs text-slate-400 mt-1">
                {course.students.toLocaleString()} students
              </div>
            </div>
          </div>

          {/* Perks */}
          <div
            className="space-y-2.5 text-sm text-slate-500 border-t
            border-slate-100 pt-5"
          >
            {[
              "Full lifetime access",
              `${course.lessons} on-demand lessons`,
              "Downloadable source code",
              "Certificate of completion",
              "Mobile & desktop access",
              "30-day money-back guarantee",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Quiz button */}
          <div className="border-t border-slate-100 mt-5 pt-5">
            <div className="text-sm font-bold text-slate-700 mb-3">
              🧠 Test Your Knowledge
            </div>
            <Button
              variant="outline"
              className="w-full rounded-xl border-indigo-200 text-indigo-600
                hover:bg-indigo-50"
              onClick={() => navigate(`/courses/${course.id}/quiz`)}
            >
              Start Quick Quiz →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
