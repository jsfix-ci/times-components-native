import { DependencyList, EffectCallback, useEffect } from "react";

export const useMountedEffect = (
  callback: EffectCallback,
  deps?: DependencyList | undefined,
): void => {
  useEffect(() => {
    let _isMounted = true;
    if (_isMounted) callback();
    return () => {
      _isMounted = false;
    };
  }, deps);
};
