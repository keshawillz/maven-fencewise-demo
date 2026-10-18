/*
  Shared looks, so every button, input and label of the same kind looks the same.
  The rules come from DESIGN.md.
*/

// The yellow main button. Use it once per page. Works on <button> and on links.
// 52px tall, hover and pressed yellows, 60% opacity when disabled, 2px black focus ring.
export const mainButtonClass =
  "inline-flex min-h-[3.25rem] w-full items-center justify-center rounded bg-tape px-6 py-2 " +
  "font-condensed text-[1.375rem] font-semibold leading-tight text-black transition-colors " +
  "hover:bg-tape-hover active:bg-tape-pressed " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-tape";

// Text inputs. Tint background, faint border, 2px black border on focus, red border when invalid.
// (The extra 1px of the focus border is drawn inside with ring-inset so the text doesn't shift.)
export const inputClass =
  "block min-h-[3.25rem] w-full rounded border border-black/20 bg-tint px-4 py-2 text-[1.125rem] text-black " +
  "outline-none focus:border-black focus:ring-1 focus:ring-inset focus:ring-black " +
  "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error " +
  "disabled:opacity-60";

// The label above an input, or the legend above a group of tiles.
export const labelClass = "mb-2 block font-medium";

// An error message under the field that caused it.
export const errorClass = "mt-2 text-[0.875rem] font-medium text-error";

// Headlines: 40px on phones, 56px from 640px up.
export const headlineClass =
  "font-condensed text-[2.5rem] font-semibold leading-none tracking-[-0.01em] sm:text-[3.5rem]";

// The plain underlined text link (like "Change my answers"). At least 44px tall to tap.
export const textLinkClass =
  "inline-flex min-h-11 items-center underline underline-offset-4 hover:decoration-2 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
