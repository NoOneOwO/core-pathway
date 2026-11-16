import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Notice } from "../components/Notice.tsx";

export function Missing() {
  useEffect(() => {
    document.title = "Page not found, Care pathway register";
  }, []);

  return (
    <div className="container page">
      <Notice as="h1" title="This page is not in the register">
        <p>The views are the overview, the pathway, the team, the map, the limits, the care loop, and the presentation.</p>
        <Link className="btn btn-primary" to="/">
          Back to the overview
        </Link>
      </Notice>
    </div>
  );
}
