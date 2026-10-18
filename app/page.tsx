import SignupForm from "@/components/SignupForm";

/*
  Your home page. This is the blank page every product in the cohort starts from.
  Week 1: replace the headline and subhead with your positioning.
  Week 2: build your one core flow (usually on its own page under app/).
  Week 3: this page goes live on Amplify, and the form starts saving for real.
*/
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">[Your product name]</p>
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          [Headline: what it is and who it&apos;s for, in one line]
        </h1>
        <p className="max-w-xl text-lg text-zinc-600">
          [Subhead: the benefit, in one sentence a stranger would understand in five seconds.]
        </p>
      </header>

      <SignupForm heading="[Call to action, like: Get early access]" buttonLabel="[Button label]" source="home" />

      <footer className="mt-auto text-xs text-zinc-400">
        [Privacy line: what you collect and why. Added in week 3.]
      </footer>
    </main>
  );
}
