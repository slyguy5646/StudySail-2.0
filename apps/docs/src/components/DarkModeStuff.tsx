"use client";

import { ReactNode, useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { Switch } from "./ui/switch";
import { IconMoon, IconSun } from "@tabler/icons-react";

interface IDarkModeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<IDarkModeContext>({ darkMode: false, setDarkMode: () => {} });

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <body className={darkMode ? "dark" : ""}>{children}</body>
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-x-2">
      <IconSun />

      <Switch onCheckedChange={setDarkMode} />
      <IconMoon />
    </div>
  );
}
