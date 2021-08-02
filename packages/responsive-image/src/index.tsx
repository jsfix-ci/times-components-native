import React, { useCallback, useState, memo } from "react";
import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
  ImageStyle,
  PixelRatio,
  View,
  StyleSheet,
} from "react-native";
import Url from "url-parse";
import logoPath from "../assets/t.png";
import { appendToImageURL } from "@times-components-native/utils";
import findClosestWidth from "./utils/findClosestWidth";
import styles from "./styles";

const localStyles = StyleSheet.create({
  placeholder: { resizeMode: "center", height: "100%" },
});

export interface ResponsiveImageProps {
  readonly aspectRatio?: number;
  readonly onImagePress?: () => void;
  readonly caption?: JSX.Element;
  readonly uri: string;
  readonly relativeHeight?: number;
  readonly relativeHorizontalOffset?: number;
  readonly relativeVerticalOffset?: number;
  readonly relativeWidth?: number;
  readonly resizeMode?: ImageStyle["resizeMode"];
  readonly rounded?: boolean;
  readonly style?: any;
  readonly onLayout?: ImageBackgroundProps["onLayout"];
  readonly onError?: ImageProps["onError"];
  readonly captionText?: string;
}

const constructImageUrl = ({
  uri,
  relativeWidth,
  relativeHeight,
  relativeVerticalOffset,
  relativeHorizontalOffset,
}: {
  uri: string;
  relativeWidth: number | string;
  relativeHeight: number | string;
  relativeVerticalOffset: number | string;
  relativeHorizontalOffset: number | string;
}) => {
  const url: Url = new Url(uri, true);
  if (!uri.includes("data:")) {
    url.query.rel_width = (relativeWidth || 1).toString();
    url.query.rel_height = (relativeHeight || 1).toString();
    url.query.rel_vertical_offset = relativeVerticalOffset
      ? relativeVerticalOffset.toString()
      : "0";
    url.query.rel_horizontal_offset = relativeHorizontalOffset
      ? relativeHorizontalOffset.toString()
      : "0";
  }

  return url.toString();
};

const ResponsiveImage = memo(
  ({
    uri,
    aspectRatio,
    style: propStyle = {},
    relativeHeight = 1,
    relativeHorizontalOffset = 0,
    relativeVerticalOffset = 0,
    relativeWidth = 1,
    resizeMode,
    rounded,
    onLayout,
    onError,
    captionText,
  }: ResponsiveImageProps) => {
    const [width, setWidth] = useState(0);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const borderRadius = rounded ? 9999 : 0;

    const imageRef = useCallback((event) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
      if (onLayout) onLayout(event);
    }, []);

    const onImageLoad = useCallback(() => {
      setShowPlaceholder(false);
    }, []);

    const onImageError = useCallback(
      (error: any) => {
        if (onError) onError(error);
      },
      [onError],
    );

    const imageUrl = constructImageUrl({
      uri,
      relativeWidth,
      relativeHeight,
      relativeVerticalOffset,
      relativeHorizontalOffset,
    });

    if (!uri) return null;

    if (!width) {
      return (
        <ImageBackground
          onLayout={imageRef}
          source={logoPath}
          fadeDuration={0}
          imageStyle={{
            ...styles.imageStyle,
            borderRadius,
            resizeMode: "center",
          }}
          style={[
            styles.style,
            propStyle,
            {
              aspectRatio,
              borderRadius,
            },
          ]}
        />
      );
    }

    const ratio = PixelRatio.get();
    const closestWidth = width && findClosestWidth(width * ratio);
    const imageUrlWithWidth = appendToImageURL(
      imageUrl,
      "resize",
      closestWidth,
    );

    return (
      <View style={[styles.style, propStyle, { aspectRatio, borderRadius }]}>
        {showPlaceholder && (
          <Image
            key="placeholder"
            source={logoPath}
            borderRadius={0}
            fadeDuration={0}
            style={[localStyles.placeholder, { width }]}
          />
        )}
        <Image
          fadeDuration={0}
          accessible
          accessibilityLabel={captionText}
          source={{ uri: imageUrlWithWidth }}
          onLoad={onImageLoad}
          onError={onImageError}
          resizeMethod={"resize"}
          style={{
            aspectRatio,
            borderRadius,
            ...styles.imageStyle,
            resizeMode: resizeMode || "cover",
          }}
        />
      </View>
    );
  },
);

export default ResponsiveImage;
