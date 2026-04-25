import ThemeBuilder from "@/components/ThemeBuilder";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <ThemeBuilder />
    </ErrorBoundary>
  );
}
