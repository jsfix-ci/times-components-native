import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

// import {
//   TileGFront,
//   TileHFront,
// } from "@times-components-native/edition-slices/src/tiles";
// import InTodaysEdition from "@times-components-native/in-todays-edition";

// import { useResponsiveContext } from "@times-components-native/responsive";
//import { Orientation } from "@times-components-native/responsive/src/types";

const FrontLeadTwo = (props) => {
  const scales = [
    0.823,
    0.882,
    0.941,
    1,
    1.118,
    1.235,
    1.353,
    1.786,
    2.143,
    2.643,
    3.143,
    3.571,
  ];

  const [scaleIndex, setScaleIndex] = useState(3);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const { width, fontScale } = useWindowDimensions();

  const getLayout = () => {
    // const breakpoint = width / fontScale;
    const breakpoint = width / scales[scaleIndex];

    // default layout - fontScale @ 1
    const layout = {
      colSize: "100%",
      inTodaySize: "100%",
      direction: "column",
      size: "small",
    };

    if (breakpoint > 600 && breakpoint < 1080) {
      layout.colSize = "50%";
      layout.direction = "row";
      layout.size = "medium";
    }

    if (breakpoint >= 1080) {
      layout.colSize = "35%";
      layout.direction = "row";
      layout.inTodaySize = "30%";
      layout.size = "large";
    }

    return layout;
  };

  const layout = getLayout();

  console.log("LAYOUT: ", layout);

  const getInToday = () => (
    <View style={{ backgroundColor: "violet", width: "100%", height: 100 }}>
      <Text>IN TODAY SECTION</Text>
    </View>
  );

  const updateScaleIndex = (value) => {
    let newIndex = scaleIndex;
    newIndex += value;
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex === scales.length) {
      newIndex = scales.length - 1;
    }
    setScaleIndex(newIndex);
  };

  const toggleShowExtraContent = () => {
    setShowExtraContent(!showExtraContent);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "pink",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: layout.direction, flex: 1 }}>
        <View style={{ backgroundColor: "orange", width: layout.colSize }}>
          <Text
            style={{
              fontSize: 18 * scales[scaleIndex],
              marginVertical: 12,
              marginHorizontal: 12,
            }}
          >
            Current scale: {scales[scaleIndex]} Layout: {layout.size}
          </Text>
          <Text
            style={{
              fontSize: 18 * scales[scaleIndex],
              marginVertical: 12,
              marginHorizontal: 12,
            }}
          >
            Current Layout: {layout.size}
          </Text>
          <Button title="Smaller" onPress={() => updateScaleIndex(-1)} />
          <Button title="larger" onPress={() => updateScaleIndex(1)} />
          <Button
            title="toggle extra content"
            onPress={() => toggleShowExtraContent()}
          />
          <Text
            style={{ fontSize: 32 * scales[scaleIndex], marginHorizontal: 12 }}
          >
            Times Newspaper Headline
          </Text>
          {!showExtraContent ? null : (
            <>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
              <Text style={{ fontSize: 32 }}>x</Text>
            </>
          )}
          {/* <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text> */}
        </View>
        <View style={{ backgroundColor: "purple", width: layout.colSize }}>
          <Text style={{ fontSize: 32 }}>A</Text>
          <Text style={{ fontSize: 32 }}>B</Text>
          <Text style={{ fontSize: 32 }}>C</Text>
        </View>
        <View style={{ width: layout.inTodaySize }}>
          {layout.size === "large" ? getInToday() : null}
        </View>
      </View>
      {layout.size !== "large" ? getInToday() : null}
    </ScrollView>
  );
};

export default FrontLeadTwo;
