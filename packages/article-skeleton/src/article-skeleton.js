import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  ScrollView,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { withTrackScrollDepth } from "@times-components-native/tracking";
import { Viewport } from "@skele/components";
import { render } from "@times-components-native/markup-forest";
import {
  articleSkeletonDefaultProps,
  articleSkeletonPropTypes,
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./tracking/article-tracking-context";
import Gutter, { maxWidth } from "./gutter";
import styles from "./styles/shared";
import getArticleBodyRowRenderers from "./article-body/article-body-row";
import fixup from "./body-utils";
import ErrorBoundary from "./boundary";
import { useResponsiveContext } from "@times-components-native/responsive";
import {
  getCropByPriority,
  isTemplateWithLeadAssetInGallery,
} from "@times-components-native/utils";
import { colours } from "@times-components-native/styleguide";
import { getFirstParagraphText } from "@times-components-native/utils/src/logbox-utils";

const { ArticleEvents } = NativeModules;
const articleEventEmitter = new NativeEventEmitter(ArticleEvents);

const getAllImages = (template, leadAsset, fixedContent) => {
  if (isTemplateWithLeadAssetInGallery(template, leadAsset)) {
    return [
      {
        attributes: {
          ...getCropByPriority(leadAsset),
          caption: leadAsset.caption,
          credits: leadAsset.credits,
          imageIndex: 0,
        },
      },
      ...fixedContent.filter(node => node.name === "image"),
    ];
  }

  return fixedContent.filter(node => node.name === "image");
};

///////////////////////////////////////////////////////////////////////////////////////////////////

const MemoisedArticle = React.memo(props => {
  const { Header, data, isArticleTablet, narrowContent, setLayoutRef } = props;
  const { content, template, leadAsset } = data;
  //To track potential re-renders
  console.log(
    "🚀 ~ article-skeleton.js:L64 ~ MemoisedArticle ~ 1st paragraph",
    getFirstParagraphText(content),
  );

  const { windowWidth } = useResponsiveContext();

  const [fixedContent, images] = useMemo(() => {
    /**
     * Processes props then forces footer to appear at the end with {name: footer} object
     */
    const fixedContentMemo = [...fixup(props), { name: "footer" }];
    const imagesMemo = getAllImages(template, leadAsset, fixedContentMemo);
    return [fixedContentMemo, imagesMemo];
  }, [content, isArticleTablet]);

  /**
   * Returns an object of JSX render functions
   * {
   *    [elementName as string]: (tree, key, indx) => JSX.Element
   * }
   */

  const articleBodyRowRenderers = getArticleBodyRowRenderers({
    ...props,
    images,
  });

  /**
   * Returns a function that returns either;
   *  - A JSX element
   *  - OR any recursively rendered children if element name does not exists in renderers
   */
  const renderArticleBodyRowChild = render(articleBodyRowRenderers);

  const getKeyFactsIDs = () => {
    let keyFactsIDsArray = [];
    const keyFactsFiltered = props.data.content.filter(
      item => item.name === "keyFacts",
    );

    const keyFactsFilteredChildren = keyFactsFiltered?.[0]?.children;

    if (keyFactsFilteredChildren?.length > 0) {
      keyFactsFilteredChildren.map(keyFactsFilteredChild =>
        keyFactsFilteredChild.children.map(item => {
          item.children.map(childItem => {
            if (childItem) {
              const href = childItem.attributes?.href || null;
              if (href?.startsWith("#")) {
                keyFactsIDsArray.push(href.substring(1));
              }
            }
          });
        }),
      );
    }
    return keyFactsIDsArray;
  };

  const keyFactIDs = getKeyFactsIDs();

  /**
   * Renders a JSX element
   * The element rendered depends on item.name and the possible
   * components that can be rendered comes from getArticleBodyRowRenderers
   */
  const ArticleContentRow = ({ item, index }) => {
    return (
      <View
        /**
         * On mount or layout change of component add a ref if item has an ID.
         * if it has an ID it's likely because there is a key fact link to this component.
         */
        onLayout={event => {
          if (item.attributes && item.attributes.id) {
            if (keyFactIDs && keyFactIDs.includes(item.attributes.id)) {
              setLayoutRef(item.attributes.id, event.nativeEvent.layout);
            }
          }
        }}
        style={narrowContent ? styles.keylineWrapper : undefined}
      >
        <Gutter>
          <ErrorBoundary>
            {renderArticleBodyRowChild(item, index.toString(), index)}
          </ErrorBoundary>
        </Gutter>
      </View>
    );
  };

  return (
    <>
      <Gutter>
        <Header width={Math.min(maxWidth, windowWidth)} />
      </Gutter>
      {fixedContent.map((item, index) => {
        const key = `fixedContent-${
          item.attributes?.id || item.attributes?.value || index
        }`;
        return <ArticleContentRow key={key} item={item} index={index} />;
      })}
    </>
  );
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

const ArticleWithContent = props => {
  const { onArticleRead, data, useCommentTabletPadding } = props;
  const articleReadTimerDuration = 6000;
  const hasBeenRead = useRef(false);
  let articleReadDelay = null;

  /**
   * Ref for scroll view stored to allow scrollToRef
   * function to scroll to a key fact article ref
   */
  const scrollRef = useRef(null);

  /**
   * stores object with references to article headline refs
   * to allow KeyFacts to scroll to a certain place on screen,
   * works like an internal HML anchor link on the web
   * {
   *    [id: string]: nativeEvent.layout
   * }
   */
  const [layoutRefs, setLayoutRefs] = useState({});

  const setLayoutRef = useCallback((id, nativeEventLayout) => {
    setLayoutRefs(refs => {
      refs[id] = nativeEventLayout;
      return refs;
    });
  }, []);

  /**
   * Scrolls to a ref if it exists in layout refs
   */
  const scrollToRef = useCallback(
    idToScrollTo => {
      const id = idToScrollTo.substring(1);

      if (layoutRefs[id]) {
        const y = layoutRefs[id].y;
        if (Platform.OS === "android" && ArticleEvents.scrollToY) {
          ArticleEvents.scrollToY(y);
        } else {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              y,
              animated: true,
            });
          } else {
            console.warn(
              "🚀 ~ file: article-skeleton.js:L227 ~ scrollRef.current not set",
            );
          }
        }
      }
    },
    [layoutRefs, scrollRef],
  );

  const setArticleReadTimeout = articleId => {
    if (articleId === data.id && !hasBeenRead.current) {
      articleReadDelay = setTimeout(() => {
        setArticleRead();
      }, articleReadTimerDuration);
    } else {
      clearTimeout(articleReadDelay);
    }
  };

  useEffect(() => {
    const updateReadArticlesEventsListener = articleEventEmitter.addListener(
      "onArticleFocus",
      setArticleReadTimeout,
    );

    return updateReadArticlesEventsListener.remove;
  }, []);

  const setArticleRead = () => {
    if (hasBeenRead.current) return;
    hasBeenRead.current = true;
    onArticleRead && onArticleRead(data.id);
  };

  const handleScroll = () => {
    !hasBeenRead.current && setArticleRead();
  };

  return (
    <View style={styles.articleContainer}>
      <Viewport.Tracker>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled
          onScroll={handleScroll}
          scrollEventThrottle={400}
          ref={ref => (scrollRef.current = ref)}
          contentContainerStyle={
            useCommentTabletPadding && {
              paddingLeft: "25%",
            }
          }
          style={{
            backgroundColor: colours.functional.gutter,
          }}
        >
          <MemoisedArticle
            {...props}
            layoutRefs={layoutRefs}
            setLayoutRef={setLayoutRef}
            scrollToRef={scrollToRef}
          />
        </ScrollView>
      </Viewport.Tracker>
    </View>
  );
};

ArticleWithContent.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: {},
  onTooltipPresented: () => null,
  tooltips: [],
};

const ArticleSkeleton = props => {
  const { data } = props;
  if (!data) {
    return null;
  }

  const { content } = data;

  if (!content) {
    return null;
  }

  return <ArticleWithContent {...props} />;
};

ArticleSkeleton.displayName = "ArticleSkeleton";

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: PropTypes.shape({}),
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onImagePress: PropTypes.func.isRequired,
  useCommentTabletPadding: PropTypes.bool,
};
ArticleSkeleton.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {},
};

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
