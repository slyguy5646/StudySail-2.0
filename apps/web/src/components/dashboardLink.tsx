"use client";

import { ReactNode } from "react";
import { useDash } from "./Dashboard/Nav/DashboardRouterContext";


export default function DashboardLink({
  route,
  children,
  insert,
}: {
  route?: string;
  children: ReactNode;
  insert?: boolean;
}) {
  const { router, currentRoute } = useDash();

  return (
    <div
      onClick={() => {
        route
          ? insert == true
            ? router.push(getInsertRoute(route, currentRoute))
            : router.push(route)
          : router.back();
      }}
    >
      {children}
    </div>
  );
}

function getInsertRoute(str: string, currentRoute: string) {
  const split = currentRoute.split("/");

  split.splice(split.length - 1, 0, str);

  return split.join("/");
}
