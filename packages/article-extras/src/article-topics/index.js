import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleTopics from "@times-components-native/article-topics";
import { useResponsiveContext } from "@times-components-native/responsive";
import styles from "./styles";

const ShowTopics = ({ topics, onPress, narrowContent }) => {
  const { isTablet, narrowArticleBreakpoint } = useResponsiveContext();

  if (topics && topics.length > 0) {
    return (
      <View
        style={[
          styles.topicsContainer,
          isTablet && styles.topicsContainerTablet,
          narrowContent &&
            styles.narrow && {
              maxWidth: narrowArticleBreakpoint.content,
            },
        ]}
      >
        <ArticleTopics onPress={onPress} topics={topics} />
      </View>
    );
  }

  return null;
};

ShowTopics.propTypes = {
  onPress: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ),
  narrowContent: PropTypes.bool,
};

ShowTopics.defaultProps = {
  topics: null,
  narrowContent: false,
};

export default ShowTopics;
