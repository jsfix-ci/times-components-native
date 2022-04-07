import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

function AnimatedBullet() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    fadeIn();
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "white",
          height: 5,
          width: 5,
        },
        {
          opacity: fadeAnim,
        },
      ]}
    />
  );
}

export default AnimatedBullet;
