import Github from "./icons/Github";
import Twitter from "./icons/Twitter";

export default function Footer() {
  return (
    <footer className="container mx-auto my-5 flex h-16 flex-col items-center justify-between space-y-3 border-t px-3 pt-4 text-center sm:h-20 sm:flex-row sm:pt-2 md:text-lg">
      <div>© {new Date().getFullYear()} SharpStudio</div>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <a
          href="https://twitter.com/abokahfa"
          className="group"
          aria-label="Twitter"
        >
          <Twitter />
        </a>
        <a
          href="https://github.com/ahmedsomaa"
          className="group"
          aria-label="GitHub"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}
