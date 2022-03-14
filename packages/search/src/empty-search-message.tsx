import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/empty-search-message-styles";

const { container, text, title } = styles;

const EmptySearchMessage = () => (
  <View style={container}>
    <Text style={title} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
      Popular thing to search for:
    </Text>
    <Text style={text} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
      Articles
    </Text>
    <Text style={text} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
      Topics
    </Text>
    <Text style={text} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
      Journalists
    </Text>
  </View>
);

export default EmptySearchMessage;
