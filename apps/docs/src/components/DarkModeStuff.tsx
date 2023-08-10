"use client";

import { ReactNode, useContext, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { Switch } from "./ui/switch";
import { IconMoon, IconSun } from "@tabler/icons-react";

interface IDarkModeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DARK_MODE_STORAGE_KEY = "docs_darkmode";

function setLocalStorageMode(darkMode: boolean) {
  window.localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkMode));
}
function getLocalStorageMode() {
  return window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
}

export const DarkModeContext = createContext<IDarkModeContext>({ darkMode: false, setDarkMode: () => {} });

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const previousMode = getLocalStorageMode();

    if (previousMode) {
      setDarkMode(JSON.parse(previousMode));
    } else {
      setLocalStorageMode(darkMode);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <body className={darkMode ? "dark" : ""}>{children}</body>
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  function changeColorMode(darkMode: boolean) {
    setDarkMode(darkMode);
    setLocalStorageMode(darkMode);
  }

  return {
    darkMode,
    setDarkMode: changeColorMode,
  };
}

export function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-x-2">
      <IconSun />

      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      <IconMoon />
    </div>
  );
}
