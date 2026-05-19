import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "../components/ProgressBar";
import { COURSES, QUIZ_BANK } from "../data/courses";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === Number(id));

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!course)
    return (
      <div className="text-center py-20">
        <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );

  const q = QUIZ_BANK[current];
  const pct = Math.round((current / QUIZ_BANK.length) * 100);
  const finalPct = Math.round((score / QUIZ_BANK.length) * 100);

  function pick(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.ans) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= QUIZ_BANK.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  /* ── Result screen ── */
  if (finished) {
    const medal =
      finalPct >= 80
        ? "🥇 Excellent!"
        : finalPct >= 60
          ? "🥈 Good effort!"
          : "🥉 Keep practicing!";
    const bg =
      finalPct >= 80
        ? "bg-yellow-50 border-yellow-300 text-yellow-800"
        : finalPct >= 60
          ? "bg-slate-100 border-slate-300 text-slate-700"
          : "bg-amber-50 border-amber-300 text-amber-800";
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-5">🎉</div>
        <div
          className="text-7xl font-extrabold text-indigo-600 font-heading
          leading-none mb-2"
        >
          {score}
          <span className="text-4xl text-slate-400">/{QUIZ_BANK.length}</span>
        </div>
        <p className="text-slate-500 text-base mb-6">
          You answered {score} of {QUIZ_BANK.length} correctly ({finalPct}%)
        </p>
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
          border-2 text-sm font-bold mb-8 ${bg}`}
        >
          {medal}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white
              rounded-full px-8"
            onClick={() => navigate(`/courses/${id}`)}
          >
            Back to Course
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 border-indigo-200 text-indigo-600"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setSelected(null);
              setAnswered(false);
              setFinished(false);
            }}
          >
            Retry Quiz
          </Button>
          <Button
            variant="ghost"
            className="rounded-full px-8"
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  /* ── Question screen ── */
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <button
        onClick={() => navigate(`/courses/${id}`)}
        className="flex items-center gap-1 text-sm text-indigo-600
          font-semibold mb-8 hover:gap-2 transition-all"
      >
        ← Back to Course
      </button>

      <div
        className="bg-white border border-slate-200 rounded-2xl
        p-10 shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="bg-indigo-50 text-indigo-600 text-xs font-bold
            px-4 py-1.5 rounded-full"
          >
            Question {current + 1} of {QUIZ_BANK.length}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            Score: {score} / {current}
          </span>
        </div>

        <ProgressBar value={pct} className="mb-8" />

        <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-7">
          {q.q}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.opts.map((opt, i) => {
            let cls =
              "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700";
            if (answered) {
              if (i === q.ans)
                cls =
                  "border-green-400 bg-green-50 text-green-700 font-semibold";
              else if (i === selected && selected !== q.ans)
                cls = "border-red-400 bg-red-50 text-red-700";
              else cls = "border-slate-100 bg-slate-50 text-slate-400";
            }
            if (!answered && selected === i)
              cls =
                "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold";

            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => pick(i)}
                className={`w-full flex items-center gap-4 px-5 py-4
                  border-2 rounded-xl text-sm transition-all text-left ${cls}`}
              >
                <div
                  className="w-7 h-7 rounded-full bg-slate-100 flex
                  items-center justify-center text-xs font-bold shrink-0"
                >
                  {LETTERS[i]}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback + Next */}
        {answered && (
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-bold
              ${selected === q.ans ? "text-green-600" : "text-red-600"}`}
            >
              {selected === q.ans
                ? "✓ Correct! Well done!"
                : "✗ Incorrect. See answer above."}
            </span>
            <Button
              onClick={next}
              className="bg-indigo-600 hover:bg-indigo-700 text-white
                rounded-full px-8"
            >
              {current + 1 < QUIZ_BANK.length
                ? "Next Question →"
                : "See Results 🏆"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
