import React, { FC } from "react";
import { Text } from "@times-components-native/text";
import { gqlRgbaToHex } from "@times-components-native/utils";
import styles from "./style";

export type ArticleLabelProps = {
  allowFontScaling?: boolean;
  color?:
    | string
    | {
        alpha: number;
        blue: number;
        green: number;
        red: number;
      };
  title: string;
  childTestID?: string;
};

const ArticleLabel: FC<ArticleLabelProps> = ({
  allowFontScaling = true,
  color = "black",
  title,
  childTestID,
}) => {
  return (
    <Text
      allowFontScaling={allowFontScaling}
      testID={childTestID}
      style={[
        styles.title,
        { color: gqlRgbaToHex(color) || (color as string | undefined) },
      ]}
    >
      {title.toUpperCase()}
    </Text>
  );
};

export default ArticleLabel;
