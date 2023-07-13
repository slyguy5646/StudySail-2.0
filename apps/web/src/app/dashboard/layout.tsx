import { ReactNode } from "react";
import "../dash.css";

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
