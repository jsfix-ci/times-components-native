import React from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  subscript: {
    fontSize: 10,
  },
  superscript: {
    fontSize: 10,
  },
});

export default {
  block(key, attributes, renderedChildren) {
    return <View key={key}>{renderedChildren}</View>;
  },
  bold(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.bold}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  break(key) {
    return (
      <Text key={key} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
        {"\n"}
      </Text>
    );
  },
  emphasis(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.italic}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  inline(key, attributes, renderedChildren) {
    return (
      <Text key={key} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
        {renderedChildren}
      </Text>
    );
  },
  italic(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.italic}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  paragraph(key, attributes, renderedChildren) {
    return (
      <Text maxFontSizeMultiplier={2} minimumFontScale={0.7}>
        {renderedChildren}
      </Text>
    );
  },
  strong(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.bold}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  subscript(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.subscript}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  superscript(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.superscript}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
  text(key, { value }) {
    return value;
  },
};
