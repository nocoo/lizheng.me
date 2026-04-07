import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Zheng Li",
  description: "Projects and open source work by Zheng Li",
  robots: {
    index: false, // Don't index placeholder page
    follow: true,
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">Coming soon...</p>
        <a href="/" className="text-neutral-600 dark:text-neutral-300 hover:underline">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
