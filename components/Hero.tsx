import BackgroundGradient from "./BackgoundGradient";

export default function Hero() {
  return (
    <div className="relative h-[350px] w-full px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://sharp.pixelplumbing.com/"
          className="mb-5 cursor-pointer rounded-2xl border border-black px-4 py-1 text-sm text-slate-600 transition duration-300 ease-in-out hover:text-slate-700 sm:text-base"
        >
          Powered by <span className="font-bold text-primary">Sharp</span>
        </a>
        <h1 className="bg-gradient-to-br from-black to-zinc-600 bg-clip-text text-4xl/[1.07] font-bold tracking-tight text-transparent md:text-6xl/[1.07]">
          High Image Processing
        </h1>
        <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
          Resize and convert your images with{" "}
          <b className="font-semibold">precision</b> and
          <b className="font-semibold"> ease</b>!
        </p>
      </div>
      {/* background gradient */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] hidden h-full w-full grid-cols-3 md:grid">
        <BackgroundGradient />
        <BackgroundGradient />
        <BackgroundGradient />
      </div>
    </div>
  );
}
