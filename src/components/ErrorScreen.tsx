"use client";

interface ErrorScreenProps {
  message: string;
  isTimeout: boolean;
  onRetry: () => void;
}

export default function ErrorScreen({ message, isTimeout, onRetry }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full flex flex-col items-center gap-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isTimeout ? "bg-yellow-100" : "bg-red-100"
          }`}
        >
          <svg
            className={`w-8 h-8 ${isTimeout ? "text-yellow-600" : "text-red-600"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
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

        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">
            {isTimeout ? "Connection Timeout" : "Failed to Load"}
          </h1>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onRetry}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Reload Page
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
