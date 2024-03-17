import Link from "next/link";

import Logo from "../Logo";
import Github from "../icons/Github";

export default function Header() {
  return (
    <div className="container relative m-0 mx-auto py-10 md:px-10">
      <div className="max-width flex items-center justify-between">
        <Link className="flex w-fit items-center gap-[2px]" href="/">
          <Logo />
        </Link>
        <div className="flex w-fit items-center gap-[22px]">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ahmedsomaa/picloom"
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100"
          >
            <Github />
            <h1>Star on GitHub</h1>
          </a>
        </div>
      </div>
    </div>
  );
}
