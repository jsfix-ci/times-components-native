/* eslint-disable prefer-destructuring */
import React from "react";
import { Dimensions, TextComponent } from "react-native";
import styleFactory from "../../styles/article-body";
import ArticleLink from "../article-link";

import { useResponsiveContext } from "@times-components-native/responsive";

const { fontScale } = Dimensions.get("window");

interface LinkProps {
  children: string | TextComponent;
  href: string;
  canonicalId: string;
  type: string;
  onLinkPress: any;
}

const Link = ({
  children,
  href,
  canonicalId,
  type,
  onLinkPress,
}: LinkProps) => {
  const { narrowArticleBreakpoint } = useResponsiveContext();
  const styles = styleFactory({
    fontScale,
    narrowArticleBreakpoint,
  });
  return (
    <ArticleLink
      testID={"hyperlink"}
      url={href}
      style={styles.articleLink}
      onPress={(e: any) =>
        onLinkPress(e, {
          canonicalId,
          type,
          url: href,
        })
      }
    >
      {children}
    </ArticleLink>
  );
};

export default Link;
