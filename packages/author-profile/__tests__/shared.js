import React from "react";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform,
} from "@times-components-native/jest-serializer";
import TestRenderer from "react-test-renderer";
import { hash } from "@times-components-native/test-utils";
import shared from "./shared.base";
import AuthorProfile from "../src/author-profile";
import author from "./fixtures";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style" || key === "testID"),
      replacePropTransform((value, key) =>
        key === "emptyStateMessage" ? hash(value) : value,
      ),
    ),
  );

  const props = {
    analyticsStream() {
      return null;
    },
    author,
    onArticlePress() {
      return null;
    },
    onTwitterLinkPress() {
      return null;
    },
    refetch() {
      return null;
    },
    slug: "some-slug",
  };

  const tests = [
    {
      name: "twitter link uses onTwitterLinkPress",
      test() {
        const onTwitterLinkPress = jest.fn();

        const testInstance = TestRenderer.create(
          <AuthorProfile
            {...props}
            isLoading={false}
            onTwitterLinkPress={onTwitterLinkPress}
          />,
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList",
        );

        const articleListHeader = TestRenderer.create(
          articleList.props.articleListHeader,
        );

        const twitterLink = articleListHeader.root.find(
          node => node.props.testID === "twitterLink",
        );

        twitterLink.props.onPress("event");

        expect(onTwitterLinkPress.mock.calls).toMatchSnapshot();
      },
    },
  ];

  shared(props, tests);
};
