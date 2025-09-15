import React, { useEffect, useRef, useState } from "react";

const Utterances: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!ref.current) return;

    const getTheme = () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light";

    setTheme(getTheme());

    const loadUtterances = (theme: "light" | "dark") => {
      if (!ref.current) return;
      ref.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("repo", "hilmyha/whodareuu");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("label", "comment");
      script.setAttribute(
        "theme",
        theme === "dark" ? "github-dark" : "github-light"
      );

      ref.current.appendChild(script);
    };

    loadUtterances(getTheme());

    // pantau perubahan class html (ModeToggle di header)
    const observer = new MutationObserver(() => {
      const newTheme = getTheme();
      if (newTheme !== theme) setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} id="comments" />;
};

export default Utterances;
