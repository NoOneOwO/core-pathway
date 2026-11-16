import type { ReactNode } from "react";

export function Notice({
  title,
  as = "h2",
  children,
}: {
  title: string;
  as?: "h1" | "h2";
  children: ReactNode;
}) {
  const Heading = as;
  return (
    <div className="notice">
      <Heading>{title}</Heading>
      <div className="notice-copy">{children}</div>
    </div>
  );
}
