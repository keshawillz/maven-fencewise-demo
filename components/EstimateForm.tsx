"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChoiceTiles from "@/components/ChoiceTiles";
import { errorClass, headlineClass, inputClass, labelClass, mainButtonClass } from "@/components/ui";
import {
  HEIGHTS,
  MATERIALS,
  MAX_GATES,
  MAX_LENGTH,
  answersToSearch,
  formatMoney,
  perFootRange,
  type Height,
  type MaterialId,
} from "@/lib/pricing";

/*
  The four questions: length, material, height, gates.
  On "See my estimate" it checks the answers, shows any problems next to the
  field, and otherwise goes to /result with the answers in the web address.
*/

type Errors = { length?: string; material?: string; gates?: string };

export default function EstimateForm() {
  const router = useRouter();
  const params = useSearchParams();

  // Start from earlier answers if they're in the web address ("Change my answers"),
  // otherwise from the defaults in DESIGN.md: 6 ft tall, 1 gate.
  const [length, setLength] = useState(params.get("length") ?? "");
  const [material, setMaterial] = useState(params.get("material") ?? "");
  const [height, setHeight] = useState(params.get("height") === "4" ? "4" : "6");
  const [gates, setGates] = useState(params.get("gates") ?? "1");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function checkAnswers(): Errors {
    const found: Errors = {};
    const lengthNumber = Number(length.trim());
    const gatesNumber = Number(gates.trim());

    if (!length.trim()) {
      found.length = "Enter the fence length in feet.";
    } else if (!Number.isInteger(lengthNumber) || lengthNumber <= 0) {
      found.length = "Enter whole feet, like 150.";
    } else if (lengthNumber > MAX_LENGTH) {
      found.length = `Enter ${MAX_LENGTH.toLocaleString("en-US")} feet or less.`;
    }

    if (!MATERIALS.some((m) => m.id === material)) {
      found.material = "Pick a material.";
    }

    if (!gates.trim()) {
      found.gates = "Enter the number of gates. Use 0 if you don't need one.";
    } else if (!Number.isInteger(gatesNumber) || gatesNumber < 0) {
      found.gates = "Enter a whole number, 0 or more.";
    } else if (gatesNumber > MAX_GATES) {
      found.gates = `Enter ${MAX_GATES} gates or fewer.`;
    }

    return found;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = checkAnswers();
    setErrors(found);

    // Move the keyboard focus to the first field with a problem.
    if (found.length) return document.getElementById("length")?.focus();
    if (found.material) return document.querySelector<HTMLInputElement>('input[name="material"]')?.focus();
    if (found.gates) return document.getElementById("gates")?.focus();

    setSubmitting(true);
    const search = answersToSearch({
      length: Number(length.trim()),
      material: material as MaterialId,
      height: Number(height) as Height,
      gates: Number(gates.trim()),
    });
    router.push(`/result?${search}`);
  }

  // The tiles show the per-foot price for the height that's picked.
  const materialChoices = MATERIALS.map((m) => {
    const range = perFootRange(m.id, Number(height) as Height);
    return {
      value: m.id,
      title: m.name,
      detail: `${formatMoney(range.low)} to ${formatMoney(range.high)} per ft`,
    };
  });
  const heightChoices = HEIGHTS.map((h) => ({ value: String(h), title: `${h} ft` }));

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className={`mt-8 ${headlineClass}`}>Four quick questions.</h1>

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <label htmlFor="length" className={labelClass}>
            Fence length (feet)
          </label>
          <input
            id="length"
            type="text"
            inputMode="numeric"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              if (errors.length) setErrors({ ...errors, length: undefined });
            }}
            aria-invalid={errors.length ? true : undefined}
            aria-describedby={errors.length ? "length-error" : undefined}
            className={inputClass}
          />
          {errors.length && (
            <p id="length-error" className={errorClass}>
              {errors.length}
            </p>
          )}
        </div>

        <ChoiceTiles
          name="material"
          legend="Material"
          choices={materialChoices}
          value={material}
          onChange={(value) => {
            setMaterial(value);
            if (errors.material) setErrors({ ...errors, material: undefined });
          }}
          error={errors.material}
        />

        <ChoiceTiles name="height" legend="Height" choices={heightChoices} value={height} onChange={setHeight} />

        <div>
          <label htmlFor="gates" className={labelClass}>
            Gates
          </label>
          <input
            id="gates"
            type="text"
            inputMode="numeric"
            value={gates}
            onChange={(e) => {
              setGates(e.target.value);
              if (errors.gates) setErrors({ ...errors, gates: undefined });
            }}
            aria-invalid={errors.gates ? true : undefined}
            aria-describedby={errors.gates ? "gates-error" : undefined}
            className={inputClass}
          />
          {errors.gates && (
            <p id="gates-error" className={errorClass}>
              {errors.gates}
            </p>
          )}
        </div>

        <button type="submit" disabled={submitting} className={mainButtonClass}>
          {submitting ? "Working it out…" : "See my estimate"}
        </button>
      </div>
    </form>
  );
}
