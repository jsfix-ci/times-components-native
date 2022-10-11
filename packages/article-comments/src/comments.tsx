import React, { FC } from "react";
import { GestureResponderEvent, TextProps, View } from "react-native";
import { Text } from "@times-components-native/text";
import Context from "@times-components-native/context";
import Button from "@times-components-native/button";
import { TextLink } from "@times-components-native/link";
import styleguide from "@times-components-native/styleguide";
import styles from "./styles";

export type CommentsProps = {
  articleId: string;
  commentCount?: number;
  narrowContent?: boolean;
  onCommentGuidelinesPress: TextProps["onPress"];
  onCommentsPress: (
    event: GestureResponderEvent,
    { articleId, url }: { articleId: string; url: string },
  ) => void;
  url: string;
};

const Comments: FC<CommentsProps> = ({
  articleId,
  commentCount = 0,
  onCommentGuidelinesPress,
  onCommentsPress,
  url,
}) => {
  return (
    <View style={styles.container} testID="comments">
      <Text style={styles.headline}>{`${commentCount} ${
        commentCount === 1 ? "comment" : "comments"
      }`}</Text>
      <Text style={styles.supporting}>
        Comments are subject to our community guidelines, which can be
        viewed&nbsp;
        <TextLink
          onPress={onCommentGuidelinesPress}
          style={styles.link}
          target={null}
          url={null}
        >
          here
        </TextLink>
      </Text>
      <Context.Consumer>
        {() => {
          const themedStyleguide = styleguide();
          const fontFactory = themedStyleguide.fontFactory({
            font: "supporting",
            fontSize: "button",
          });
          return (
            <Button
              fontSize={fontFactory.fontSize}
              lineHeight={fontFactory.lineHeight}
              onPress={e => onCommentsPress(e, { articleId, url })}
              style={styles.button}
              title={commentCount > 0 ? "View comments" : "Post a comment"}
            />
          );
        }}
      </Context.Consumer>
    </View>
  );
};

export default Comments;
