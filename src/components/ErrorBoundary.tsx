"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ThemeBuilder] Render error caught by ErrorBoundary:", error.message);
    console.error("[ThemeBuilder] Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "1rem",
              padding: "2.5rem",
              maxWidth: "28rem",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: "#fee2e2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
              {this.state.error?.message ??
                "An unexpected error occurred while rendering the application."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Reload Page
              </button>
            </div>

            <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "1.25rem" }}>
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
