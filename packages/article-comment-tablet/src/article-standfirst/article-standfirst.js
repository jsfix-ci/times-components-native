import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Context from "@times-components-native/context";
import styles from "../styles";

const HeaderStandfirst = ({ standfirst }) => {
  if (!standfirst) return null;

  return (
    <Context.Consumer>
      {({ maxFontSizeMultiplier, minimumFontScale }) => (
        <Text
          accessibilityRole="header"
          aria-level="2"
          style={styles.standFirst}
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
  standfirst: PropTypes.string,
};

HeaderStandfirst.defaultProps = {
  standfirst: null,
};

export default HeaderStandfirst;
