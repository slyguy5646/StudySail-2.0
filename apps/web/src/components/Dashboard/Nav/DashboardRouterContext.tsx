"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useContext, createContext } from "react";
import { NoNullFields } from "@/types/types";

interface IDashboardRouterContext {
  router: AppRouterInstance | null;
  currentRoute: string;
}

export const DashboardRouterContext = createContext<{
  router: AppRouterInstance | null;
  currentRoute: string;
}>({ router: null, currentRoute: "" });


type NonNullDashboardRouterContext = NoNullFields<IDashboardRouterContext>;

export default function DashboardRouterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DashboardRouterContext.Provider value={{ router, currentRoute: pathname }}>
      {children}
    </DashboardRouterContext.Provider>
  );
}

export function useDash() {
  return useContext(DashboardRouterContext) as NonNullDashboardRouterContext;
}
