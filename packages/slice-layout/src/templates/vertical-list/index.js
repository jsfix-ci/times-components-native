import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const ListVerticalLayout = ({ style, tiles }) => {
  const ids = tiles.map((tile, index) =>
    tile.props.tile ? tile.props.tile.article.id : index,
  );
  const listKey = ids.join("");
  return (
    <FlatList
      data={tiles}
      removeClippedSubviews
      style={style}
      windowSize={3}
      listKey={listKey}
      initialNumToRender={5}
      keyExtractor={(item, index) => item.props.tileName || index}
      renderItem={({ item, index }) => (
        <View key={`${item.props.tileName || index}`}>
          {item}
          {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
        </View>
      )}
    />
  );
};

ListVerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired,
};

ListVerticalLayout.defaultProps = {
  style: {},
};

export default ListVerticalLayout;
