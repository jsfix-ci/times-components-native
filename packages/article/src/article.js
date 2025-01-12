import React, { useMemo } from "react";
import ArticleMagazineComment from "@times-components-native/article-magazine-comment";
import ArticleInDepth from "@times-components-native/article-in-depth";
import ArticleMagazineStandard from "@times-components-native/article-magazine-standard";
import ArticleMainStandard from "@times-components-native/article-main-standard";
import ArticleMainComment from "@times-components-native/article-main-comment";
import ArticleCommentTablet from "@times-components-native/article-comment-tablet";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { scales } from "@times-components-native/styleguide";
import { MessageManager } from "@times-components-native/message-bar";
import { getMediaList, addIndexesToInlineImages } from "./utils";

export const getComponentByTemplate = (template, isArticleTablet) => {
  const templates = {
    indepth: ArticleInDepth,
    magazinecomment: isArticleTablet
      ? ArticleCommentTablet
      : ArticleMagazineComment,
    magazinestandard: ArticleMagazineStandard,
    maincomment: isArticleTablet ? ArticleCommentTablet : ArticleMainComment,
    mainstandard: ArticleMainStandard,
  };

  return templates[template] || ArticleMainStandard;
};

export class TakeoverBailout extends Error {
  constructor(message) {
    super(message);
    this.name = "TakeoverBailout";
  }
}

const Article = props => {
  const { isArticleTablet } = usePartialResponsiveContext();
  const { article, onImagePress } = props;
  const { leadAsset, template } = article || {};

  let { content } = article || {};

  if (template === "takeoverpage") {
    throw new TakeoverBailout("Aborted react render: Takeover page");
  }

  let onImagePressArticle = useMemo(() => {
    if (onImagePress) {
      content = addIndexesToInlineImages(content, leadAsset);
      const mediaList = getMediaList(content, leadAsset);
      return index => onImagePress(index, mediaList);
    }
    return null;
  }, []);

  const Component = useMemo(() => {
    return getComponentByTemplate(template, isArticleTablet);
  }, [isArticleTablet, template]);

  const newProps = {
    ...props,
    article: {
      ...article,
      template: article && article.template ? article.template : "mainstandard",
    },
  };

  return (
    <MessageManager animate delay={3000} scale={scales.medium}>
      <Component {...newProps} onImagePress={onImagePressArticle} />
    </MessageManager>
  );
};

export default Article;
