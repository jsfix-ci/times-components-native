import React, { Fragment } from "react";
import { Text } from "react-native";
import Context from "@times-components-native/context";
import styles from "./styles";

const ArticleListError = () => (
  <Context.Consumer>
    {({ maxFontSizeMultiplier, minimumFontScale }) => (
      <Fragment>
        <Text
          style={styles.listErrorHeading}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          Something&apos;s gone wrong
        </Text>
        <Text
          style={styles.listErrorMessage}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          We can&apos;t load the page you have requested. Please check your
          network connection and retry to continue
        </Text>
      </Fragment>
    )}
  </Context.Consumer>
);

export default ArticleListError;
