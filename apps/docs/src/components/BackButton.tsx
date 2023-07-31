"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function BackButton({ route, children }: { route?: string; children: ReactNode }) {
  const router = useRouter();

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
