"use client";

import { createContext, useContext, useState } from "react";

type AppState = {
  /** true once the preloader has finished — intro animations key off this */
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  /** true once the alpine image and snow renderer are ready */
  sceneReady: boolean;
  setSceneReady: (v: boolean) => void;
};

const AppContext = createContext<AppState>({
  loaded: false,
  setLoaded: () => {},
  sceneReady: false,
  setSceneReady: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <AppContext.Provider value={{ loaded, setLoaded, sceneReady, setSceneReady }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
