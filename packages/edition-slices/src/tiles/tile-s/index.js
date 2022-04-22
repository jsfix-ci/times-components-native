/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "@times-components-native/text";
import coreRenderers from "@times-components-native/markup";
import renderTrees from "@times-components-native/markup-forest";
import { editionBreakpoints } from "@times-components-native/styleguide";
import renderer from "./markup";
import styleFactory from "./styles";

function renderAst(ast) {
  return renderTrees(ast, {
    ...coreRenderers,
    ...renderer,
  });
}

const TileS = ({
  tile,
  breakpoint = editionBreakpoints.small,
  logo = null,
}) => {
  const styles = styleFactory(breakpoint);
  const headLineStyles =
    [editionBreakpoints.smallTablet, editionBreakpoints.medium].includes(
      breakpoint,
    ) && logo
      ? styles.titleWithoutMargin
      : styles.title;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        {logo}
        <Text allowFontScaling={false} style={headLineStyles}>
          {tile.title}
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles.paragraph}>
        {renderAst(tile.content)}
      </Text>
      {tile.byline && tile.byline.length > 0 && (
        <Text allowFontScaling={false} style={styles.byline}>
          {renderAst(tile.byline)}
        </Text>
      )}
    </View>
  );
};

TileS.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  logo: PropTypes.element,
};

export default TileS;
