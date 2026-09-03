import { useEffect, useState } from "react";
import "./Header.css";

const LINKS = [
  { id: "sketch", label: "Sketch" },
  { id: "benefits", label: "Benefits" },
  { id: "benefits-gallery", label: "Gallery" },
  { id: "intro", label: "Intro" },
];

export default function Header() {
  const [activeId, setActiveId] = useState(LINKS[0].id);

  useEffect(() => {
    const ids = LINKS.map((link) => link.id);

    const updateActive = () => {
      const mark = window.innerHeight * 0.32;
      let next = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mark && rect.bottom > mark) {
          next = id;
          break;
        }
      }

      setActiveId((prev) => (prev === next ? prev : next));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <header className="site-header">
      <div></div>
      <nav className="site-nav" aria-label="Sections">
        {LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={`site-nav-link${activeId === link.id ? " is-active" : ""}`}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
