/*
  The frame around every screen: the "Fencewise" wordmark at the top and a
  single column, at most 560px wide, with the content left-aligned.
*/
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[35rem] px-6 pb-16 pt-12 sm:pt-16">
      <p className="font-condensed text-[1.375rem] font-semibold leading-none">Fencewise</p>
      {children}
    </main>
  );
}
