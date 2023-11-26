import Image from "next/image";
import { MainNav } from "./ui/main-nav";
import { ModeToggle } from "./Toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link className="mr-4" href="/">
          <Image src="/icon.png" alt="JourniTask" width={200} height={40} />
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
