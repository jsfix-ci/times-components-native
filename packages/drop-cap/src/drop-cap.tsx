import { fonts } from "@times-components-native/styleguide";
import React from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
interface Props {
  dropCapColor: string;
  dropCapFont: string;
  dropCapText: string;
  width: number;
  height: number;
}

const DropCap: React.FC<Props> = ({
  dropCapColor,
  dropCapFont,
  dropCapText,
  height,
}) => {
  return (
    <View
      style={{
        width: 300,
        height,
        overflow: "visible",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -2,
          left: 0,
        }}
      >
        <Text
          allowFontScaling={false}
          style={[
            {
              color: dropCapColor,
              fontFamily: fonts[dropCapFont as keyof typeof fonts],
              fontSize: height * 1.3,
              lineHeight: height * 1.3,
            },
          ]}
        >
          {dropCapText}
        </Text>
      </View>
    </View>
  );
};

export default DropCap;
