export default function ProgressBar({ value, className = "" }) {
  return (
    <div
      className={`w-full bg-slate-100 rounded-full h-2.5 overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400
          rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
