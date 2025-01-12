import React from "react";
import { Text, View } from "react-native";
import { DateTime } from "luxon";
import { ArticleFlags } from "@times-components-native/article-flag";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import styleguide, { spacing } from "@times-components-native/styleguide";
import { safeDecodeURIComponent } from "@times-components-native/utils";

interface IProps {
  breaking?: boolean;
  headline: string;
  updated: string;
}

function ArticleUpdateHeader({ breaking = false, headline, updated }: IProps) {
  const { isArticleTablet } = usePartialResponsiveContext();

  const defaultZone = "Europe/London";
  const locale = "en-GB";
  const userZone = DateTime.local().zoneName;
  const dt = DateTime.fromISO(updated).setLocale(locale).setZone(defaultZone);
  const now = DateTime.fromISO(new Date().toISOString());
  const isToday = dt.hasSame(now, "day");
  const { colours, fonts } = styleguide();

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
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: -4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: spacing(2),
            marginTop: 8,
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
              {`${dt.toFormat("h:mma").toLocaleLowerCase()} ${
                userZone !== defaultZone ? dt.offsetNameShort : ""
              }`}
            </Text>
          </View>
        </View>
        {!isToday && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: colours.functional.secondary,
                fontFamily: fonts.supporting,
              }}
            >
              {`${dt.toFormat("MMMM d")} `}
            </Text>
          </View>
        )}
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
}

export default ArticleUpdateHeader;
