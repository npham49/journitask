"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/journal"
        className={`text-sm font-medium ${
          pathname.includes("/journal") ? "" : "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Journal
      </Link>
      <Link
        href="/taskboard"
        className={`text-sm font-medium ${
          pathname.includes("/taskboard") ? "" : "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Taskboard
      </Link>
    </nav>
  );
}
