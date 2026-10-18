import { formatMoney } from "@/lib/pricing";

/*
  The tape measure: Fencewise's one signature look (see DESIGN.md).
  A 40px yellow band with a small black tick every 8px and a taller tick every 40px,
  drawn with CSS only (no images).

  Two ways to use it:
  - <TapeMeasure />                        a plain full-width rule (home page)
  - <TapeMeasure low={4100} high={7400} /> the low price at the left end, the high
                                           price at the right, the band is the range
*/

const tickMarks = {
  backgroundImage:
    // Tall ticks (16px) every 40px, then short ticks (8px) every 8px.
    "repeating-linear-gradient(to right, #000 0 1px, transparent 1px 40px), " +
    "repeating-linear-gradient(to right, #000 0 1px, transparent 1px 8px)",
  backgroundSize: "100% 16px, 100% 8px",
  backgroundRepeat: "no-repeat",
};

function Band({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`h-[40px] bg-tape ${className}`} style={tickMarks} />;
}

// Price size: headline size, but shrinks a little on very narrow phones so both prices fit.
const priceClass =
  "whitespace-nowrap font-condensed text-[clamp(2rem,10vw,2.5rem)] font-semibold leading-none " +
  "tracking-[-0.01em] sm:text-[3.5rem]";

export default function TapeMeasure({ low, high }: { low?: number; high?: number }) {
  if (low === undefined || high === undefined) {
    return <Band />;
  }

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      {/* Screen readers hear one sentence instead of two loose numbers. */}
      <p className="sr-only">
        Estimated cost: {formatMoney(low)} to {formatMoney(high)}.
      </p>
      <span aria-hidden="true" className={priceClass}>
        {formatMoney(low)}
      </span>
      <Band className="min-w-8 flex-1" />
      <span aria-hidden="true" className={priceClass}>
        {formatMoney(high)}
      </span>
    </div>
  );
}
