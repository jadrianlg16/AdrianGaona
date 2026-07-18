"use client";

import { createContext, useContext, useState } from "react";

type AppState = {
  /** true once the preloader has finished — intro animations key off this */
  loaded: boolean;
  setLoaded: (v: boolean) => void;
};

const AppContext = createContext<AppState>({ loaded: false, setLoaded: () => {} });

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <AppContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
