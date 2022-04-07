import React from "react";
import { View, Text } from "react-native";
import Watermark from "@times-components-native/watermark";
import Context from "@times-components-native/context";
import styles, { watermarkStyles } from "./styles";
import propTypes from "./article-list-empty-state-prop-types";

const ArticleListEmptyState = ({ message }) => (
  <Context.Consumer>
    {({ maxFontSizeMultiplier, minimumFontScale }) => (
      <View style={styles.listEmptyStateContainer}>
        <Text
          style={styles.listEmptyMessage}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          {message}
        </Text>
        <View style={styles.listEmptyWatermarkContainer}>
          <Watermark
            height={watermarkStyles.height}
            viewBox={watermarkStyles.viewBox}
            width={watermarkStyles.width}
          />
        </View>
      </View>
    )}
  </Context.Consumer>
);

ArticleListEmptyState.propTypes = propTypes;
export default ArticleListEmptyState;
