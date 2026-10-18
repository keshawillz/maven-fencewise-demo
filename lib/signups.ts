"use client";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

/*
  One function the whole app uses to save a signup.

  Two modes, picked automatically:
  - Connected (week 3 onward): amplify_outputs.json has a data endpoint,
    so the signup goes to your Amplify backend. Read them in the Amplify
    console under Data manager.
  - Local (weeks 1 and 2): no backend yet, so the signup is kept in this
    browser's storage. Good enough to click through the flow.
*/

type Outputs = { data?: { url?: string } };
const connected = Boolean((outputs as Outputs).data?.url);

if (connected) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Amplify.configure(outputs as any);
}

export type SignupInput = {
  email: string;
  name?: string;
  note?: string;
  source?: string;
};

export type SignupResult =
  | { ok: true; mode: "connected" | "local" }
  | { ok: false; error: string };

const LOCAL_KEY = "signups";

export function isConnected(): boolean {
  return connected;
}

export async function saveSignup(input: SignupInput): Promise<SignupResult> {
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email doesn't look right." };
  }

  if (connected) {
    try {
      const client = generateClient<Schema>();
      const { errors } = await client.models.Signup.create({
        email,
        name: input.name?.trim() || undefined,
        note: input.note?.trim() || undefined,
        source: input.source ?? "site",
      });
      if (errors?.length) {
        return { ok: false, error: errors[0].message };
      }
      return { ok: true, mode: "connected" };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Could not save." };
    }
  }

  try {
    const existing: SignupInput[] = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "[]");
    existing.push({ ...input, email, source: input.source ?? "site" });
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
    return { ok: true, mode: "local" };
  } catch {
    return { ok: false, error: "Could not save in this browser." };
  }
}

/* Only used in local mode, so you can see what the form captured. */
export function readLocalSignups(): SignupInput[] {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "[]");
  } catch {
    return [];
  }
}
