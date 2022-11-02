import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

//Notice it returns null if 'unknown' since https://github.com/react-native-netinfo/react-native-netinfo/compare/v5.9.10...v6.0.0
export const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  useEffect(
    () => NetInfo.addEventListener(state => setIsConnected(state.isConnected)),
    [],
  );

  return isConnected;
};
