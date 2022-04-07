/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "react-native";
import Context from "@times-components-native/context";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const AuthorComponent = ({ children, className }) => (
  <Context.Consumer>
    {({ maxFontSizeMultiplier, minimumFontScale }) => (
      <Text
        className={className}
        style={styles.opinion}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        minimumFontScale={minimumFontScale}
      >
        {children}
      </Text>
    )}
  </Context.Consumer>
);

const ArticleBylineOpinion = ({ ast, ...props }) =>
  renderByline(AuthorComponent, ast, styles.opinion, props);

ArticleBylineOpinion.displayName = "ArticleBylineOpinion";

ArticleBylineOpinion.propTypes = propTypes;
ArticleBylineOpinion.defaultProps = defaultProps;

export default ArticleBylineOpinion;
