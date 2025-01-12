import React from "react";
import TestRenderer from "react-test-renderer";
import { ContextProviderWithDefaults } from "@times-components-native/context";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";
import { scales } from "@times-components-native/styleguide";
import { setIsTablet } from "@times-components-native/mocks/dimensions";
import KeyFacts from "../src/key-facts";
import dataWithTitle from "../fixtures/key-facts-test.json";
import dataWithoutTitle from "../fixtures/key-facts-no-title-test.json";
import {
  withMobileContext,
  withTabletContext,
} from "@times-components-native/test-utils";

// scrollToY
// eslint-disable-next-line global-require
jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.ArticleEvents = {
    scrollToY: jest.fn(),
  };
  return rn;
});

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "style"),
      minimalNativeTransform,
    ),
  );

  it("key facts with title on mobile", () => {
    const testInstance = TestRenderer.create(
      withMobileContext(
        <KeyFacts
          ast={dataWithTitle}
          onLinkPress={() => null}
          analyticsStream={() => null}
        />,
      ),
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts with title on tablet", () => {
    const testInstance = TestRenderer.create(
      withTabletContext(
        <KeyFacts
          ast={dataWithTitle}
          onLinkPress={() => null}
          analyticsStream={() => null}
        />,
      ),
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts without title on tablet", () => {
    setIsTablet(true);
    const testInstance = TestRenderer.create(
      <KeyFacts
        ast={dataWithoutTitle}
        onLinkPress={() => null}
        analyticsStream={() => null}
      />,
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts without title on mobile", () => {
    const testInstance = TestRenderer.create(
      withMobileContext(
        <KeyFacts
          ast={dataWithoutTitle}
          onLinkPress={() => null}
          analyticsStream={() => null}
        />,
      ),
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts with title and context theme", () => {
    const scale = scales.large;
    const sectionColour = "#FFFFFF";

    const testInstance = TestRenderer.create(
      withMobileContext(
        <ContextProviderWithDefaults
          value={{ theme: { scale, sectionColour } }}
        >
          <KeyFacts
            ast={dataWithTitle}
            onLinkPress={() => null}
            analyticsStream={() => null}
          />
        </ContextProviderWithDefaults>,
      ),
    );

    expect(testInstance).toMatchSnapshot();
  });
};
