import React from "react";
import PropTypes from "prop-types";
import { Text } from "@times-components-native/text";
import renderTrees, {
  propTypes as treePropTypes,
} from "@times-components-native/markup-forest";
import coreRenderers from "@times-components-native/markup";
import styles from "./styles";

const AuthorProfileHeadBiography = ({ biography }) => (
  <Text style={styles.biography} testID="author-bio">
    {renderTrees(biography, coreRenderers)}
  </Text>
);

AuthorProfileHeadBiography.propTypes = {
  biography: PropTypes.arrayOf(treePropTypes).isRequired,
};

export default AuthorProfileHeadBiography;
