"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import ThemeBuilder from "@/components/ThemeBuilder";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

type AppState = "loading" | "ready" | "error" | "timeout";

const LOAD_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;

const log = {
  info: (msg: string, data?: Record<string, unknown>) =>
    console.log(`[ThemeBuilder] ${msg}`, data ?? ""),
  warn: (msg: string, data?: Record<string, unknown>) =>
    console.warn(`[ThemeBuilder] ${msg}`, data ?? ""),
  error: (msg: string, data?: Record<string, unknown>) =>
    console.error(`[ThemeBuilder] ${msg}`, data ?? ""),
};

async function initializeApp(signal: AbortSignal): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, 800);
    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (transitionRef.current) { clearTimeout(transitionRef.current); transitionRef.current = null; }
    if (retryTimerRef.current) { clearTimeout(retryTimerRef.current); retryTimerRef.current = null; }
  }, []);

  const load = useCallback(
    async (attempt: number) => {
      cleanup();

      const controller = new AbortController();
      controllerRef.current = controller;
      setAppState("loading");
      setProgress(0);
      setElapsed(0);

      const startAt = Date.now();
      log.info("Load started", { attempt, maxRetries: MAX_RETRIES });

      let p = 0;
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startAt) / 1000));
        p = Math.min(90, p + Math.random() * 18);
        setProgress(Math.round(p));
      }, 400);

      timeoutRef.current = setTimeout(() => {
        const elapsedSec = Math.round((Date.now() - startAt) / 1000);
        log.error("Load timed out", { elapsedSeconds: elapsedSec, timeoutMs: LOAD_TIMEOUT_MS });
        cleanup();
        setAppState("timeout");
        setErrorMsg(
          "Connection timeout. The server is taking too long to respond. Please refresh or contact support."
        );
      }, LOAD_TIMEOUT_MS);

      try {
        await initializeApp(controller.signal);
        if (!controller.signal.aborted) {
          const elapsedSec = Math.round((Date.now() - startAt) / 1000);
          log.info("Load succeeded", { elapsedSeconds: elapsedSec, attempt });
          if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
          controllerRef.current = null;
          setProgress(100);
          transitionRef.current = setTimeout(() => {
            transitionRef.current = null;
            setAppState("ready");
          }, 200);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        cleanup();
        const elapsedSec = Math.round((Date.now() - startAt) / 1000);
        const message = err instanceof Error ? err.message : String(err);
        const next = attempt + 1;
        if (next < MAX_RETRIES) {
          const backoffMs = 1000 * 2 ** attempt;
          log.warn("Load failed, retrying", { attempt, next, elapsedSeconds: elapsedSec, backoffMs, message });
          setRetryCount(next);
          retryTimerRef.current = setTimeout(() => {
            retryTimerRef.current = null;
            load(next);
          }, backoffMs);
        } else {
          log.error("Load failed after all retries", { attempt, elapsedSeconds: elapsedSec, message });
          setAppState("error");
          setErrorMsg(
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while loading the application."
          );
        }
      }
    },
    [cleanup]
  );

  useEffect(() => {
    load(0);
    return cleanup;
  }, [load, cleanup]);

  const handleCancel = useCallback(() => {
    log.info("Load cancelled by user");
    cleanup();
    setAppState("error");
    setErrorMsg("Loading was cancelled. Click 'Try Again' to reload the application.");
  }, [cleanup]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    load(0);
  }, [load]);

  if (appState === "loading") {
    return (
      <LoadingScreen
        progress={progress}
        elapsedTime={elapsed}
        retryCount={retryCount}
        onCancel={handleCancel}
        maxRetries={MAX_RETRIES}
      />
    );
  }

  if (appState === "error" || appState === "timeout") {
    return (
      <ErrorScreen
        message={errorMsg}
        isTimeout={appState === "timeout"}
        onRetry={handleRetry}
      />
    );
  }

  return <ThemeBuilder />;
}
