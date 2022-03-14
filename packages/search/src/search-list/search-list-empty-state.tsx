import React, { useEffect } from "react";
import { Text, Image, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles/search-list-empty-state-styles";
import { ImageIcons } from "@times-components-native/icons/src/icons/imageIcons";

interface SearchListEmptyStateProps {
  children?: React.ReactNode;
  message: string;
  title: string;
  icon?: string;
  track: () => void;
}

function SearchListEmptyState({
  children = null,
  message,
  title,
  icon = "search",
  track,
}: SearchListEmptyStateProps) {
  useEffect(() => {
    track();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.listEmptyStateContainer}
    >
      <Image
        source={ImageIcons[icon]}
        style={{
          width: 160,
          height: 160,
          alignSelf: "center",
        }}
      />
      <Text
        style={styles.listEmptyTitle}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {title}
      </Text>
      <Text
        style={styles.listEmptyMessage}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {message}
      </Text>
      {children}
    </KeyboardAvoidingView>
  );
}

export default SearchListEmptyState;
