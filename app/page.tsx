import Link from "next/link";
import PageShell from "@/components/PageShell";
import TapeMeasure from "@/components/TapeMeasure";
import { headlineClass, mainButtonClass } from "@/components/ui";

/*
  Home: headline, the tape rule, subhead, and one button.
  Per SPEC.md the signup form is NOT here; it lives on the result screen only.
*/
export default function Home() {
  return (
    <PageShell>
      <h1 className={`mt-20 ${headlineClass}`}>Get a fence price before you call anyone.</h1>

      <div className="mt-6">
        <TapeMeasure />
      </div>

      <p className="mt-8">
        Answer four questions and get a real ballpark number in 60 seconds. No sales visit, no login.
      </p>

      <Link href="/estimate" className={`mt-12 ${mainButtonClass}`}>
        Get my estimate
      </Link>
    </PageShell>
  );
}
