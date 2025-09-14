import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function ScrollToTop() {
  return (
    <Button variant={"ghost"} size={"icon"} onClick={scrollToTop}>
      <ArrowUpToLine className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      <span className="sr-only">Toggle scroll to top</span>
    </Button>
  );
}
