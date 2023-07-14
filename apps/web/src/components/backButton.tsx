"use client";

import { ReactNode } from "react";
import { useDash } from "./Dashboard/Nav/DashboardRouterContext";

export default function BackButton({ route, children }: { route?: string; children: ReactNode }) {
  const { router } = useDash();

  return (
    <div
      onClick={() => {
        route ? router.push(route) : router.back();
      }}
    >
      {children}
    </div>
  );
}
