"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import TapeMeasure from "@/components/TapeMeasure";
import { headlineClass, mainButtonClass, textLinkClass } from "@/components/ui";
import { isConnected } from "@/lib/signups";
import {
  answersFromSearch,
  answersToSearch,
  describeAnswers,
  estimate,
  noteForSignup,
  whatMovesThePrice,
} from "@/lib/pricing";

/*
  Three possible screens:
  - Missing answers: someone opened /result directly. Send them to the form.
  - Result: the price range on the tape, and the "Request a real quote" form.
  - Done: after the quote request saves. The estimate stays visible.
*/
export default function ResultView() {
  const params = useSearchParams();
  const answers = answersFromSearch(params);
  const [done, setDone] = useState(false);
  const doneHeading = useRef<HTMLHeadingElement>(null);

  // When the screen switches to Done, jump to the top and move focus to "Got it."
  // so keyboard and screen reader users know what happened.
  useEffect(() => {
    if (done) {
      window.scrollTo(0, 0);
      doneHeading.current?.focus();
    }
  }, [done]);

  if (!answers) {
    return (
      <>
        <h1 className={`mt-8 ${headlineClass}`}>We need your answers first.</h1>
        <p className="mt-4">
          Your estimate comes from four quick questions about your fence. It takes about a minute.
        </p>
        <Link href="/estimate" className={`mt-12 ${mainButtonClass}`}>
          Get my estimate
        </Link>
      </>
    );
  }

  const { low, high } = estimate(answers);
  const summary = describeAnswers(answers);

  if (done) {
    return (
      <>
        <h1 ref={doneHeading} tabIndex={-1} className={`mt-8 outline-none ${headlineClass}`}>
          Got it.
        </h1>
        <p className="mt-4">We&apos;ll send a real quote within two business days.</p>

        <section className="mt-12" aria-label="Your estimate">
          <p className="mb-2 text-[0.875rem] font-medium">Your estimate</p>
          <TapeMeasure low={low} high={high} />
          <p className="mt-4">{summary}</p>
        </section>

        <Link href="/estimate" className={`mt-12 ${mainButtonClass}`}>
          Start another estimate
        </Link>

        {!isConnected() && (
          <p className="mt-6 text-[0.875rem]">
            Local mode: this request is saved in this browser until Amplify is connected.
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <h1 className={`mt-8 ${headlineClass}`}>Your ballpark.</h1>
      <p className="mt-2">{summary}</p>

      <div className="mt-6">
        <TapeMeasure low={low} high={high} />
      </div>
      <p className="mt-4">{whatMovesThePrice(answers)}</p>

      <Link href={`/estimate?${answersToSearch(answers)}`} className={`mt-2 ${textLinkClass}`}>
        Change my answers
      </Link>

      <div className="mt-12">
        <SignupForm
          heading="Request a real quote."
          buttonLabel="Request a real quote"
          source="estimate"
          note={noteForSignup(answers)}
          onSuccess={() => setDone(true)}
        />
      </div>
    </>
  );
}
