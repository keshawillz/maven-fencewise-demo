"use client";

import { useState } from "react";
import { isConnected, saveSignup } from "@/lib/signups";

/*
  The signup form. Email required, name optional.
  Change the copy to match your positioning. Keep the saveSignup call.

  This is also the reference for every button and input in the project:
  44px tall, visible focus ring, hover and pressed looks, disabled at 60%,
  and errors shown next to the field that caused them.
*/

const inputClass =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 " +
  "outline-none transition-colors hover:border-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/20 " +
  "aria-[invalid=true]:border-red-600";

const buttonClass =
  "min-h-11 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-base font-medium text-white transition-colors " +
  "hover:bg-zinc-700 active:bg-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export default function SignupForm({
  heading = "Get early access",
  buttonLabel = "Sign me up",
  source = "home",
}: {
  heading?: string;
  buttonLabel?: string;
  source?: string;
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
      setEmailError("Enter your email so we can reach you.");
      return;
    }

    setStatus("saving");
    const result = await saveSignup({ email, name, source });

    if (result.ok) {
      setStatus("done");
      setMessage(
        result.mode === "connected"
          ? "You're on the list. We'll be in touch."
          : "Saved in this browser (local mode). Connect Amplify in week 3 to save for real."
      );
      setEmail("");
      setName("");
      return;
    }

    setStatus("error");
    if (result.error.toLowerCase().includes("email")) {
      setEmailError(result.error);
    } else {
      setMessage(result.error);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-zinc-900">{heading}</h2>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="signup-name" className="text-sm text-zinc-700">
            Name <span className="text-zinc-400">(optional)</span>
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

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-email" className="text-sm text-zinc-700">
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
            <p id="signup-email-error" className="text-sm text-red-700">
              {emailError}
            </p>
          )}
        </div>

        <button type="submit" disabled={status === "saving"} className={buttonClass}>
          {status === "saving" ? "Saving…" : buttonLabel}
        </button>
      </div>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-zinc-600"}`}
        >
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-zinc-500">
        {isConnected()
          ? "We only use your email to tell you about this product. No spam, unsubscribe any time."
          : "Local mode: signups stay in this browser until Amplify is connected."}
      </p>
    </form>
  );
}
