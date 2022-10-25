import React, { useContext, useEffect, useRef, useState } from "react";
import { AppState, ScaledSize, Dimensions } from "react-native";
import ResponsiveContext from "./context";
import PartialResponsiveContext from "./partial-context";

import { calculateResponsiveContext } from "./calculateResponsiveContext";

interface DimensionChangeEvent {
  window: ScaledSize;
}

const ResponsiveProvider: React.FC = ({ children }) => {
  const { fontScale, width, height } = Dimensions.get("window");

  const appState = useRef<string>(AppState.currentState);

  const onAppStateChange = (nextAppState: string) => {
    if (appState.current === nextAppState) return;
    appState.current = nextAppState;
  };

  const [state, setState] = useState(
    calculateResponsiveContext(width, height, fontScale),
  );

  const [partialState, setPartialState] = useState({
    isArticleTablet: calculateResponsiveContext(width, height, fontScale)
      .isArticleTablet,
  });

  const onDimensionChange = ({
    window: { fontScale, width, height },
  }: DimensionChangeEvent) => {
    // Prevents issue with odd orientation switch when app put in background
    if (/inactive|background/.test(appState.current)) return;
    const newState = calculateResponsiveContext(width, height, fontScale);
    if (newState.isArticleTablet !== state.isArticleTablet) {
      setPartialState({
        isArticleTablet: newState.isArticleTablet,
      });
    }
    setState(newState);
  };

  useEffect(() => {
    const appListener = AppState.addEventListener("change", onAppStateChange);
    const dimensionsListener = Dimensions.addEventListener(
      "change",
      onDimensionChange,
    );

    return () => {
      appListener.remove();
      dimensionsListener.remove();
    };
  }, []);

  /**
   * The partial context has been implemented so that components only making use of the
   * isArticleTablet value (which doesn't change as frequently as other values in the responsive
   * provider, such as width) can use this provider and avoid unnecessary re-renders
   */
  return (
    <ResponsiveContext.Provider value={state}>
      <PartialResponsiveContext.Provider value={partialState}>
        {children}
      </PartialResponsiveContext.Provider>
    </ResponsiveContext.Provider>
  );
};

const useResponsiveContext = () => useContext(ResponsiveContext);
const usePartialResponsiveContext = () => useContext(PartialResponsiveContext);

export {
  ResponsiveContext,
  useResponsiveContext,
  PartialResponsiveContext,
  usePartialResponsiveContext,
};
export default ResponsiveProvider;
