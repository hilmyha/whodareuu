"use client"; // penting untuk Next.js, kalau di Astro pakai client:load saat import

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  label: string;
  href: string;
}

export default function MobileMenu({ menu }: { menu: MobileMenuProps[] }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <nav className="mt-4 flex flex-col justify-start gap-2">
            {menu.map((item) => (
              <a href={item.href} className="w-full hover:cursor-pointer">
                <Button variant={"secondary"} className="w-full">{item.label}</Button>
              </a>
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
