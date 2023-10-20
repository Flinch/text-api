import { getServerSession } from "next-auth";
import Link from "next/link";
import Button from "./ui/Button";
import { buttonVariants } from "./ui/Button";
import SignInButton from "@/ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import ThemeToggle from "./ThemeToggle";
import ThemeTogglev2 from "@/ui/ThemeToggleV2";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className={buttonVariants({ variant: "link", size: "default" })}
          style={{ fontSize: "medium" }}
        >
          {" "}
          Text/API
        </Link>

        <div className="md:hidden">
          {" "}
          <ThemeTogglev2 />
        </div>

        <div className="hidden md:flex gap-4">
          {" "}
          <ThemeTogglev2 />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                {" "}
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
