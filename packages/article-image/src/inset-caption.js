import React from "react";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { spacing } from "@times-components-native/styleguide";
import { propTypes, defaultProps } from "./inset-caption-prop-types";

const captionStyle = {
  container: {
    paddingHorizontal: spacing(2),
  },
};

const CaptionComponentPrimaryNative = ({ text, credits, CaptionComponent }) => {
  const { isArticleTablet } = usePartialResponsiveContext();
  return (
    <CaptionComponent
      credits={credits}
      style={isArticleTablet ? {} : captionStyle}
      text={text}
    />
  );
};

CaptionComponentPrimaryNative.propTypes = propTypes;
CaptionComponentPrimaryNative.defaultProps = defaultProps;

export default CaptionComponentPrimaryNative;
