export default function Hero() {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('/squared-bg-element-dark.svg')]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://sharp.pixelplumbing.com/"
            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
          >
            Powered by
            <span className="flex items-center gap-x-1">
              <span className="border-s font-bold border-gray-200 text-primary ps-2 dark:text-primary">
                Sharp
              </span>
              <svg
                className="flex-shrink-0 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-5 text-center mx-auto">
          <h2 className="inline-block p-2 bg-gradient-to-b from-black to-zinc-700 text-transparent bg-clip-text text-4xl font-medium tracking-tighter text-dark lg:text-7xl">
            High Image Processing
          </h2>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
            Convert, resize and compress your images with{" "}
            <b className="font-semibold">precision</b> and
            <b className="font-semibold"> ease</b>!
          </p>
        </div>
      </div>
    </div>
  );
}
