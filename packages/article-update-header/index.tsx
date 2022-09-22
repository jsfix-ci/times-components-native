import React from "react";
import { Text, View } from "react-native";
import { DateTime } from "luxon";
import { ArticleFlags } from "@times-components-native/article-flag";
import { ResponsiveContext } from "@times-components-native/responsive";
import styleguide from "@times-components-native/styleguide";
import { safeDecodeURIComponent } from "@times-components-native/utils";

interface IProps {
  breaking?: boolean;
  headline: string;
  updated: string;
}

function ArticleUpdateHeader({ breaking = false, headline, updated }: IProps) {
  const dt = DateTime.fromISO(updated).setLocale("en-US");
  const { colours, fonts } = styleguide();

  return (
    <ResponsiveContext.Consumer>
      {({ isArticleTablet }) => {
        return (
          <View
            style={{
              borderTopColor: colours.functional.darkRed,
              borderTopWidth: 2,
              paddingTop: 8,
              width: "100%",
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              {breaking && (
                <View style={{ marginRight: 8 }}>
                  <ArticleFlags
                    color={colours.functional.darkRed}
                    flags={[{ type: "BREAKING", expiryTime: null }]}
                    style={{ marginBottom: 0 }}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: colours.functional.brandColour,
                    fontFamily: fonts.supporting,
                  }}
                >
                  {dt.toRelative()} |{" "}
                </Text>
                <Text
                  style={{
                    color: colours.functional.secondary,
                    fontFamily: fonts.supporting,
                  }}
                >
                  {dt.toLocaleString(DateTime.TIME_SIMPLE).toLocaleLowerCase()}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: colours.functional.brandColour,
                fontFamily: fonts.headline,
                fontSize: isArticleTablet ? 36 : 30,
              }}
            >
              {safeDecodeURIComponent(headline)}
            </Text>
          </View>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

export default ArticleUpdateHeader;
