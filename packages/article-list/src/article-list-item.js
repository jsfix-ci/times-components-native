import React from "react";
import { View } from "react-native";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent,
} from "@times-components-native/article-summary";
import Card from "@times-components-native/card";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import Link from "@times-components-native/link";
import { colours, tabletWidth } from "@times-components-native/styleguide";
import articleListItemTrackingEvents from "./article-list-item-tracking-events";
import { propTypes, defaultProps } from "./article-list-item-prop-types";
import { getImageUri, getHeadline } from "./utils";
import styles from "./styles";

const ArticleListItem = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const onItemPress = event => {
    const {
      article: { id, url },
      onPress,
    } = props;
    onPress(event, { id, url });
  };

  const renderContent = () => {
    const { article = {} } = props;
    const { showImage, shortSummary, summary } = article;
    const content = showImage ? summary : shortSummary;

    return <ArticleSummaryContent ast={content} />;
  };

  const renderHeadline = () => {
    const { article } = props;
    const { headline, shortHeadline } = article || {};
    return (
      <ArticleSummaryHeadline headline={getHeadline(headline, shortHeadline)} />
    );
  };

  const { article, highResSize, imageRatio, isLoading, showImage } = props;

  const {
    bylines,
    hasVideo,
    label,
    publicationName,
    publishedTime,
    section,
    url,
  } = article || {};

  const imageUri = getImageUri(article);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={{ flex: 1, maxWidth: tabletWidth }}>
        <Link onPress={onItemPress} url={url}>
          <View
            style={
              isArticleTablet
                ? styles.listItemContainerTablet
                : styles.listItemContainer
            }
          >
            <Card
              highResSize={highResSize}
              imageRatio={imageRatio}
              imageUri={imageUri}
              isLoading={isLoading}
              showImage={showImage}
            >
              <ArticleSummary
                bylineProps={
                  bylines
                    ? {
                        ast: bylines,
                        color: colours.section.default,
                      }
                    : null
                }
                content={renderContent}
                datePublicationProps={{
                  date: publishedTime,
                  publication: publicationName,
                }}
                headline={renderHeadline()}
                labelProps={{
                  color: colours.section[section] || colours.section.default,
                  isVideo: hasVideo,
                  title: label,
                }}
              />
            </Card>
          </View>
        </Link>
      </View>
    </View>
  );
};

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
