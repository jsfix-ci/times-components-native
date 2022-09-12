import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getDimensions,
  addDimensionsListener,
  removeDimensionsListener,
} from "@times-components-native/utils";
import { AppState, ScaledSize } from "react-native";
import ResponsiveContext from "./context";
import { calculateResponsiveContext } from "./calculateResponsiveContext";

interface DimensionChangeEvent {
  window: ScaledSize;
}

interface ResponsiveProviderProps {
  fontScale: number;
}

const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
  fontScale,
}) => {
  const { width, height } = getDimensions();

  const appState = useRef<string>(AppState.currentState);

  const onAppStateChange = (nextAppState: string) => {
    if (appState.current === nextAppState) return;
    appState.current = nextAppState;
  };

  const [state, setState] = useState(
    calculateResponsiveContext(width, height, fontScale),
  );

  const onDimensionChange = ({
    window: { width, height },
  }: DimensionChangeEvent) => {
    // Prevents issue with odd orientation switch when app put in background
    if (/inactive|background/.test(appState.current)) return;
    setState(calculateResponsiveContext(width, height, fontScale));
  };

  useEffect(() => {
    AppState.addEventListener("change", onAppStateChange);
    const listener = addDimensionsListener("change", onDimensionChange);

    return () => {
      AppState.removeEventListener("change", onAppStateChange);
      removeDimensionsListener("change", listener);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={state}>
      {children}
    </ResponsiveContext.Provider>
  );
};

const useResponsiveContext = () => useContext(ResponsiveContext);

export { ResponsiveContext, useResponsiveContext };
export default ResponsiveProvider;
