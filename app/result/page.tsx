import { Suspense } from "react";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ResultView from "@/components/ResultView";

export const metadata: Metadata = { title: "Your ballpark | Fencewise" };

/*
  The result screen (and, after the quote request saves, the done screen).
  ResultView reads the answers from the web address, so it waits inside <Suspense>.
*/
export default function ResultPage() {
  return (
    <PageShell>
      <Suspense fallback={<p className="mt-8">Loading your estimate…</p>}>
        <ResultView />
      </Suspense>
    </PageShell>
  );
}
