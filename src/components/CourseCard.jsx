// src/components/CourseCard.jsx — redesigned with modern fonts
import { useNavigate } from "react-router-dom";

const CAT_PILL = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-emerald-100 text-emerald-800",
  Data: "bg-pink-100 text-pink-800",
  Design: "bg-purple-100 text-purple-800",
};
const LVL_PILL = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const disc = Math.round((1 - course.price / course.origPrice) * 100);

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="group relative bg-white rounded-2xl border border-stone-100
        overflow-hidden cursor-pointer card-hover flex flex-col h-full
        shadow-xs hover:border-brand-200"
    >
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${course.color}`} />

      {/* Badge */}
      {course.badge && (
        <div
          className={`absolute top-3.5 right-3.5 text-[10px] font-bold
          px-2 py-0.5 rounded-full bg-gradient-to-r ${course.color}
          text-white shadow-sm font-body z-10`}
        >
          {course.badge}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Emoji icon */}
        <div
          className={`w-12 h-12 rounded-xl ${course.bgLight} flex
          items-center justify-center text-2xl mb-4 transition-transform
          duration-300 group-hover:scale-110`}
        >
          {course.emoji}
        </div>

        {/* Pill row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`chip ${CAT_PILL[course.category]}`}>
            {course.category}
          </span>
          <span className={`chip ${LVL_PILL[course.level]}`}>
            {course.level}
          </span>
        </div>

        {/* Title — display font */}
        <h3
          className="font-display font-bold text-stone-900 text-[15px]
          leading-snug mb-1 line-clamp-2 tracking-tight
          group-hover:text-brand-600 transition-colors duration-200"
        >
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-stone-400 mb-3 font-body">
          by{" "}
          <span className="text-stone-600 font-semibold">
            {course.instructor}
          </span>
        </p>

        {/* Description */}
        <p
          className="text-xs text-stone-500 leading-relaxed line-clamp-2
          mb-4 flex-1 font-body"
        >
          {course.desc}
        </p>

        {/* Tags */}
        {course.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] bg-stone-100 text-stone-500
                px-2 py-0.5 rounded-full font-semibold font-body"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Progress bar (if enrolled) */}
        {course.progress > 0 && (
          <div className="mb-4">
            <div
              className="flex justify-between text-[10px] text-stone-400
              mb-1 font-body"
            >
              <span>Progress</span>
              <span className="font-bold text-brand-600">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${course.color}
                  rounded-full`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta row */}
        <div
          className="flex items-center gap-3 text-[11px] text-stone-400
          mb-4 flex-wrap font-body"
        >
          <span>📚 {course.lessons}</span>
          <span>⏱ {course.duration}</span>
          <span className="text-amber-500 font-semibold">
            ⭐ {course.rating}
          </span>
          <span>👥 {(course.students / 1000).toFixed(1)}k</span>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3.5
          border-t border-stone-50 mt-auto"
        >
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display font-bold text-lg
              ${course.price === 0 ? "text-green-600" : "text-brand-700"}`}
            >
              {course.price === 0
                ? "Free"
                : `${course.price.toLocaleString()}đ`}
            </span>
            {course.price > 0 && (
              <>
                <span className="text-[11px] text-stone-400 line-through font-body">
                  {course.origPrice.toLocaleString()}đ
                </span>
                <span
                  className="text-[10px] font-bold bg-rose-100 text-rose-600
                  px-1.5 py-0.5 rounded-full font-body"
                >
                  -{disc}%
                </span>
              </>
            )}
          </div>

          {/* Hover CTA button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course.id}`);
            }}
            className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full
              bg-gradient-to-r ${course.color} text-white font-body
              opacity-0 group-hover:opacity-100 transition-all duration-200
              shadow-sm hover:shadow-md -translate-x-1
              group-hover:translate-x-0`}
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
}
