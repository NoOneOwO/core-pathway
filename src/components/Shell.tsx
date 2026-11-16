import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { WalkMeter } from "./WalkMeter.tsx";
import { disclaimer, stages } from "../data/content.ts";
import { stampForPath } from "../lib/walk.ts";

const destinations = [
  { to: "/", label: "Overview", active: (path: string) => path === "/" },
  { to: "/pathway/01", label: "Pathway", active: (path: string) => path.startsWith("/pathway") },
  { to: "/team", label: "Team", active: (path: string) => path.startsWith("/team") },
  { to: "/map", label: "AI map", active: (path: string) => path.startsWith("/map") },
  { to: "/limits", label: "Limits", active: (path: string) => path.startsWith("/limits") },
  { to: "/loop", label: "Care loop", active: (path: string) => path.startsWith("/loop") },
];

export function Shell() {
  const location = useLocation();
  const presenting = location.pathname.startsWith("/present");
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(location.pathname);
  const menuRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const stripRef = useRef<HTMLParagraphElement>(null);

  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    stampForPath(location.pathname);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const apply = () => {
      document.documentElement.style.setProperty("--disclaimer-h", `${strip.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      {!presenting && (
        <header className="topbar">
          <div className="container topbar-inner">
            <Link className="wordmark" to="/">
              Care pathway
            </Link>
            <button
              ref={menuRef}
              type="button"
              className="btn menu-button"
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
            <nav
              id="site-nav"
              className={open ? "site-nav is-open" : "site-nav"}
              aria-label="Primary"
            >
              {destinations.map((item, index) => {
                const current = item.active(location.pathname);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    ref={index === 0 ? firstLinkRef : undefined}
                    className={current ? "nav-link is-current" : "nav-link"}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link className="btn btn-primary" to="/present/1">
                Present
              </Link>
            </nav>
          </div>
        </header>
      )}
      {!presenting && <WalkMeter />}
      <main id="content" tabIndex={-1}>
        <Outlet />
      </main>
      {!presenting && (
        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <h2>Views</h2>
              <ul>
                {destinations.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/present/1">Present</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Stages</h2>
              <ul>
                {stages.map((stage) => (
                  <li key={stage.id}>
                    <Link to={`/pathway/${stage.id}`}>
                      <span className="num">{stage.number}</span> {stage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      )}
      <p ref={stripRef} className="disclaimer-strip" role="note">
        {disclaimer}
      </p>
    </>
  );
}
