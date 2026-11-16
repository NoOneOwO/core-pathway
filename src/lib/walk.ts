import { useEffect, useState } from "react";

const KEY = "care-pathway-walk";

export const walkGoals = [
  { id: "pathway", label: "Care-pathway map" },
  { id: "limits", label: "AI opportunity and limitation table" },
  { id: "loop", label: "Human-in-the-loop diagram" },
  { id: "present", label: "5 to 7 minute presentation" },
  { id: "map", label: "AI opportunity map" },
  { id: "stage-01", label: "Stage 01" },
  { id: "stage-02", label: "Stage 02" },
  { id: "stage-03", label: "Stage 03" },
  { id: "stage-04", label: "Stage 04" },
  { id: "stage-05", label: "Stage 05" },
  { id: "stage-06", label: "Stage 06" },
  { id: "sort", label: "Boundary sort" },
] as const;

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function addStamp(id: string) {
  const current = read();
  if (current.includes(id)) return current;
  const next = [...current, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return current;
  }
  window.dispatchEvent(new Event("walk-stamp"));
  return next;
}

export function useWalk() {
  const [stamps, setStamps] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : read(),
  );

  useEffect(() => {
    const sync = () => setStamps(read());
    window.addEventListener("walk-stamp", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("walk-stamp", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return stamps;
}

export function stampForPath(pathname: string) {
  if (pathname.startsWith("/pathway/")) {
    addStamp("pathway");
    const id = pathname.split("/")[2];
    if (id && /^0[1-6]$/.test(id)) addStamp(`stage-${id}`);
  } else if (pathname.startsWith("/map")) {
    addStamp("map");
  } else if (pathname.startsWith("/limits")) {
    addStamp("limits");
  } else if (pathname.startsWith("/loop")) {
    addStamp("loop");
  } else if (pathname.startsWith("/present")) {
    addStamp("present");
  }
}
