"use client";

interface LoadingScreenProps {
  progress: number;
  elapsedTime: number;
  retryCount: number;
  onCancel: () => void;
  maxRetries: number;
}

export default function LoadingScreen({
  progress,
  elapsedTime,
  retryCount,
  onCancel,
  maxRetries,
}: LoadingScreenProps) {
  const steps = [
    { label: "Connecting", threshold: 30 },
    { label: "Authenticating", threshold: 60 },
    { label: "Loading", threshold: 90 },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"
      style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}
      aria-live="polite"
      aria-label="Loading Qlik Sense Theme Builder"
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full flex flex-col items-center gap-6"
        style={{ backgroundColor: "#ffffff", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem", maxWidth: "28rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
      >
        <div
          className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
          style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg
            className="w-8 h-8 text-blue-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            style={{ width: "2rem", height: "2rem", color: "#2563eb", animation: "spin 1s linear infinite" }}
          >
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              style={{ opacity: 0.25 }}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              style={{ opacity: 0.75 }}
            />
          </svg>
        </div>

        <div className="text-center" style={{ textAlign: "center" }}>
          <h1
            className="text-xl font-bold text-gray-800"
            style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", margin: 0 }}
          >
            {retryCount > 0
              ? `Retrying… (attempt ${retryCount + 1} of ${maxRetries})`
              : "Initializing Theme Builder"}
          </h1>
          <p
            className="text-sm text-gray-500 mt-1"
            style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}
          >
            Connecting to Qlik Sense services
          </p>
        </div>

        <div className="w-full" style={{ width: "100%" }}>
          <div
            className="h-2 bg-gray-200 rounded-full overflow-hidden"
            style={{ height: "0.5rem", backgroundColor: "#e5e7eb", borderRadius: "9999px", overflow: "hidden" }}
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ height: "100%", backgroundColor: "#3b82f6", borderRadius: "9999px", width: `${progress}%`, transition: "width 0.5s ease" }}
            />
          </div>
          <div
            className="flex justify-between text-xs text-gray-400 mt-1"
            style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}
          >
            <span>{progress}%</span>
            <span>{elapsedTime}s elapsed</span>
          </div>
        </div>

        <div className="flex gap-4" style={{ display: "flex", gap: "1rem" }}>
          {steps.map(({ label, threshold }) => {
            const done = progress >= threshold;
            const active = progress >= threshold - 15 && !done;
            return (
              <div key={label} className="flex items-center gap-1.5" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    done
                      ? "bg-green-500"
                      : active
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: done ? "#22c55e" : active ? "#3b82f6" : "#d1d5db",
                    transition: "background-color 0.3s",
                  }}
                />
                <span
                  className={`text-xs ${done ? "text-green-600" : "text-gray-400"}`}
                  style={{ fontSize: "0.75rem", color: done ? "#16a34a" : "#9ca3af" }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={onCancel}
          className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
          style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: "0.25rem 0.5rem" }}
          aria-label="Cancel loading"
        >
          Cancel loading
        </button>
      </div>
    </div>
  );
}
