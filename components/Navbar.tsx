import Logo from "./Logo";
import Github from "./icons/Github";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center h-16">
      <div className="w-full  flex justify-between items-center text-sm text-foreground">
        <Logo color="text-primary" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ahmedsomaa/theme-font-pair"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
      </div>
    </nav>
  );
}
