/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "@times-components-native/text";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const AuthorComponent = ({ children, className }) => (
  <Text className={className} style={styles.opinion}>
    {children}
  </Text>
);

const ArticleBylineOpinion = ({ ast, ...props }) =>
  renderByline(AuthorComponent, ast, styles.opinion, props);

ArticleBylineOpinion.displayName = "ArticleBylineOpinion";

ArticleBylineOpinion.propTypes = propTypes;
ArticleBylineOpinion.defaultProps = defaultProps;

export default ArticleBylineOpinion;
