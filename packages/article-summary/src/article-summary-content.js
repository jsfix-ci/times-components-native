import React from "react";
import PropTypes from "prop-types";
import { Text } from "@times-components-native/text";
import { renderAst as defaultRenderAst } from "./renderAst";
import styles from "./styles";

const ArticleSummaryContent = ({
  allowFontScaling,
  ast,
  className,
  style,
  whiteSpaceHeight,
  initialLines = 2,
  lineHeight = styles.text.lineHeight,
  renderAst = defaultRenderAst,
}) => {
  const numberOfLinesToRender =
    whiteSpaceHeight > 0
      ? whiteSpaceHeight / lineHeight + initialLines
      : initialLines;

  const numberOfLinesProp = whiteSpaceHeight !== undefined && {
    numberOfLines: numberOfLinesToRender,
  };

  return ast.length > 0 ? (
    <Text
      allowFontScaling={allowFontScaling}
      testID={"article-summary-content"}
      className={className}
      style={[styles.text, style]}
      {...numberOfLinesProp}
    >
      {renderAst(ast)}
    </Text>
  ) : null;
};

ArticleSummaryContent.propTypes = {
  allowFontScaling: PropTypes.bool,
  ast: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

ArticleSummaryContent.defaultProps = {
  allowFontScaling: true,
  ast: [],
  className: "",
  style: null,
};

export default ArticleSummaryContent;
