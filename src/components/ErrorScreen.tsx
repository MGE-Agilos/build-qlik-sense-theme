"use client";

interface ErrorScreenProps {
  message: string;
  isTimeout: boolean;
  onRetry: () => void;
}

export default function ErrorScreen({ message, isTimeout, onRetry }: ErrorScreenProps) {
  const iconBg = isTimeout ? "#fef9c3" : "#fee2e2";
  const iconColor = isTimeout ? "#ca8a04" : "#dc2626";

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"
      style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full flex flex-col items-center gap-6"
        style={{ backgroundColor: "#ffffff", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem", maxWidth: "28rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${isTimeout ? "bg-yellow-100" : "bg-red-100"}`}
          style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg
            className={`w-8 h-8 ${isTimeout ? "text-yellow-600" : "text-red-600"}`}
            style={{ width: "2rem", height: "2rem", color: iconColor }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={iconColor}
          >
            {isTimeout ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            )}
          </svg>
        </div>

        <div className="text-center" style={{ textAlign: "center" }}>
          <h1
            className="text-xl font-bold text-gray-800"
            style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", margin: 0 }}
          >
            {isTimeout ? "Connection Timeout" : "Failed to Load"}
          </h1>
          <p
            className="text-sm text-gray-600 mt-2 leading-relaxed"
            style={{ fontSize: "0.875rem", color: "#4b5563", marginTop: "0.5rem", lineHeight: "1.6" }}
          >
            {message}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          <button
            onClick={onRetry}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
            style={{ width: "100%", padding: "0.625rem 1rem", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontWeight: "500", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            style={{ width: "100%", padding: "0.625rem 1rem", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "0.5rem", fontWeight: "500", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>

        <p
          className="text-xs text-gray-400 text-center"
          style={{ fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}
        >
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
