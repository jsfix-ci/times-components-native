import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleTopics from "@times-components-native/article-topics";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import styles from "../styles/article-topics";

const ShowTopics = ({ topics, onPress }) => {
  const { isArticleTablet } = usePartialResponsiveContext();

  if (topics && topics.length > 0) {
    return (
      <View
        style={[
          styles.topicsContainer,
          isArticleTablet && styles.topicsContainerTablet,
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
};

ShowTopics.defaultProps = {
  topics: null,
};

export default ShowTopics;
