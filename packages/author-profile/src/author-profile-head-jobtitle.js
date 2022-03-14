import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

const AuthorProfileHeadJobTitle = ({ jobTitle }) => (
  <Text
    accessibilityRole="header"
    aria-level="2"
    style={styles.jobTitle}
    maxFontSizeMultiplier={2}
    minimumFontScale={0.7}
  >
    {jobTitle.toLowerCase()}
  </Text>
);

AuthorProfileHeadJobTitle.propTypes = {
  jobTitle: PropTypes.string.isRequired,
};

export default AuthorProfileHeadJobTitle;
