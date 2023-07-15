"use client"

import { useDash } from "./DashboardRouterContext";
import { useEffect } from "react";

export default function RefreshRouter() {
  const { router } = useDash();

  useEffect(() => {
    router.refresh();
  }, []);

  return <></>;
}
