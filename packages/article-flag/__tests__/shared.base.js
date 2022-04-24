import React from "react";
import mockDate from "mockdate";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components-native/test-utils";
import ArticleFlag from "../src/ArticleFlag";
import ArticleFlags from "../src/ArticleFlags";

export default () => {
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1552580574000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  const tests = [
    {
      name: "article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag title="No Colour" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "red article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag color="red" title="Coloured Red" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "hex colour article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag color="#FF0000" title="Coloured Red" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "rgba colour article flag",
      test: () => {
        const gqlRgbaColour = {
          rgba: {
            alpha: 1,
            blue: 8,
            green: 3,
            red: 11,
          },
        };
        const testInstance = TestRenderer.create(
          <ArticleFlag color={gqlRgbaColour} title="Coloured Red" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "article flags",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlags
            flags={[
              { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
              { expiryTime: "2020-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
            ]}
          />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "article flags with container",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlags
            flags={[
              { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
              { expiryTime: "2020-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
            ]}
            withContainer
          />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "article flags with no flags",
      test: () => {
        const testInstance = TestRenderer.create(<ArticleFlags flags={[]} />);

        expect(testInstance).toMatchSnapshot();
      },
    },
  ];

  iterator(tests);
};
