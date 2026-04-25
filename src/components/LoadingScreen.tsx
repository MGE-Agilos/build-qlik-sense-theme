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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">
            {retryCount > 0
              ? `Retrying… (attempt ${retryCount + 1} of ${maxRetries})`
              : "Initializing Theme Builder"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Connecting to Qlik Sense services
          </p>
        </div>

        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{progress}%</span>
            <span>{elapsedTime}s elapsed</span>
          </div>
        </div>

        <div className="flex gap-4">
          {steps.map(({ label, threshold }) => {
            const done = progress >= threshold;
            const active = progress >= threshold - 15 && !done;
            return (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    done
                      ? "bg-green-500"
                      : active
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-xs ${
                    done ? "text-green-600" : "text-gray-400"
                  }`}
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
        >
          Cancel loading
        </button>
      </div>
    </div>
  );
}
