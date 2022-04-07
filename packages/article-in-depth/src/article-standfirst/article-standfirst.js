import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { colours } from "@times-components-native/styleguide";
import Context from "@times-components-native/context";
import styles from "../styles";

const HeaderStandfirst = ({ standfirst, color }) => {
  if (!standfirst) return null;

  return (
    <Context.Consumer>
      {({ maxFontSizeMultiplier, minimumFontScale }) => (
        <Text
          accessibilityRole="header"
          aria-level="2"
          style={[styles.standFirst, { color }]}
          testID="standfirst"
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          {standfirst}
        </Text>
      )}
    </Context.Consumer>
  );
};

HeaderStandfirst.propTypes = {
  color: PropTypes.string,
  standfirst: PropTypes.string,
};

HeaderStandfirst.defaultProps = {
  color: colours.functional.white,
  standfirst: null,
};

export default HeaderStandfirst;
