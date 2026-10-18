import { errorClass, labelClass } from "@/components/ui";

/*
  A group of radio buttons that look like tiles (material and height pickers).
  They are real radio buttons underneath, so Tab moves into the group and the
  arrow keys move between tiles without any extra code.
*/

export type Choice = {
  value: string;
  title: string; // big text, like "Wood"
  detail?: string; // small text underneath, like "$25 to $45 per ft"
};

export default function ChoiceTiles({
  name,
  legend,
  choices,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className={labelClass}>{legend}</legend>

      {/* Always 2 tiles per row, down to the smallest phones. */}
      <div className="grid grid-cols-2 gap-4">
        {choices.map((choice) => (
          <label
            key={choice.value}
            className={
              "flex min-h-14 cursor-pointer flex-col justify-center rounded border bg-tint px-4 py-3 transition-colors " +
              "hover:border-black/50 " +
              // Selected: 2px black border (1px border + 1px drawn inside, so nothing shifts).
              "has-checked:border-black has-checked:ring-1 has-checked:ring-inset has-checked:ring-black " +
              // Keyboard focus: the same 2px black focus ring as the buttons.
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-black " +
              (error ? "border-error" : "border-black/20")
            }
          >
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              className="sr-only"
            />
            <span className="font-condensed text-[1.375rem] font-semibold leading-tight">{choice.title}</span>
            {choice.detail && <span className="mt-1 text-[0.875rem] leading-snug">{choice.detail}</span>}
          </label>
        ))}
      </div>

      {error && (
        <p id={errorId} className={errorClass}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
