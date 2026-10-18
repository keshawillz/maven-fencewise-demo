"use client";

import { useState } from "react";
import { errorClass, inputClass, labelClass, mainButtonClass } from "@/components/ui";
import { isConnected, saveSignup } from "@/lib/signups";

/*
  The signup form. Email required, name optional.
  Change the copy to match your positioning. Keep the saveSignup call.

  Optional extras:
  - note: saved with the signup (the result screen puts the estimate details here,
    so you know what fence the person priced).
  - onSuccess: called after a successful save (the result screen uses it to
    switch to the "Got it." screen).

  Buttons and inputs use the shared looks in components/ui.ts.
*/

export default function SignupForm({
  heading = "Get early access",
  buttonLabel = "Sign me up",
  source = "home",
  note,
  onSuccess,
}: {
  heading?: string;
  buttonLabel?: string;
  source?: string;
  note?: string;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError("");
    setMessage("");

    if (!email.trim()) {
      setEmailError("Enter your email so we can send your quote.");
      return;
    }

    setStatus("saving");
    const result = await saveSignup({ email, name, note, source });

    if (result.ok) {
      setStatus("done");
      setMessage(
        result.mode === "connected"
          ? "You're on the list. We'll be in touch."
          : "Saved in this browser (local mode). Connect Amplify in week 3 to save for real."
      );
      setEmail("");
      setName("");
      onSuccess?.();
      return;
    }

    setStatus("error");
    if (result.error.toLowerCase().includes("email")) {
      setEmailError(result.error);
    } else {
      setMessage(`We couldn't send that just now. Please try again. (${result.error})`);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <h2 className="font-condensed text-[1.75rem] font-semibold leading-tight tracking-[-0.01em]">{heading}</h2>

      <div className="mt-6 flex flex-col gap-6">
        <div>
          <label htmlFor="signup-email" className={labelClass}>
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            autoComplete="email"
            required
            disabled={status === "saving"}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "signup-email-error" : undefined}
            className={inputClass}
          />
          {emailError && (
            <p id="signup-email-error" className={errorClass}>
              {emailError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="signup-name" className={labelClass}>
            Name (optional)
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            disabled={status === "saving"}
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={status === "saving"} className={mainButtonClass}>
          {status === "saving" ? "Sending…" : buttonLabel}
        </button>
      </div>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-[0.875rem] ${status === "error" ? "font-medium text-error" : ""}`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-[0.875rem]">
        {isConnected()
          ? "We only use your email to send your quote. No spam."
          : "Local mode: signups stay in this browser until Amplify is connected."}
      </p>
    </form>
  );
}
