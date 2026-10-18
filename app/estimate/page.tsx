import { Suspense } from "react";
import type { Metadata } from "next";
import EstimateForm from "@/components/EstimateForm";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Four quick questions | Fencewise" };

/*
  The estimate form. EstimateForm reads any earlier answers from the web address
  (when someone clicks "Change my answers"), so it waits inside <Suspense> and
  shows a short loading line for that split second.
*/
export default function EstimatePage() {
  return (
    <PageShell>
      <Suspense fallback={<p className="mt-8">Loading the questions…</p>}>
        <EstimateForm />
      </Suspense>
    </PageShell>
  );
}
