import React from "react";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components-native/styleguide";
import Context, {
  ContextProviderWithDefaults,
  SectionContext,
} from "../src/context";

export default () => {
  it("article context with default values", () => {
    const testInstance = TestRenderer.create(
      <Context.Consumer>{context => JSON.stringify(context)}</Context.Consumer>,
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("article context with inline values", () => {
    const scale = scales.large;
    const sectionColour = "#FFFFFF";
    const testInstance = TestRenderer.create(
      <Context.Provider value={{ theme: { scale, sectionColour } }}>
        <Context.Consumer>
          {context => JSON.stringify(context)}
        </Context.Consumer>
      </Context.Provider>,
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("section context with default values", () => {
    const testInstance = TestRenderer.create(
      <SectionContext.Consumer>
        {context => JSON.stringify(context)}
      </SectionContext.Consumer>,
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("section context with inline values", () => {
    const testInstance = TestRenderer.create(
      <SectionContext.Provider
        value={{
          onArticleSavePress: () => null,
          publicationName: "SUNDAYTIMES",
          recentlyOpenedPuzzleCount: 123,
          savedArticles: {
            "dummy-article-id-1": true,
            "dummy-article-id-2": true,
          },
        }}
      >
        <SectionContext.Consumer>
          {context => JSON.stringify(context)}
        </SectionContext.Consumer>
      </SectionContext.Provider>,
    );

    expect(testInstance).toMatchSnapshot();
  });

  describe("ContextProviderWithDefaults", () => {
    it("adds defaults to the provided context", () => {
      const scale = scales.large;
      const sectionColour = "#FFFFFF";
      const testInstance = TestRenderer.create(
        <ContextProviderWithDefaults
          value={{ theme: { scale, sectionColour } }}
        >
          <Context.Consumer>
            {context => JSON.stringify(context)}
          </Context.Consumer>
        </ContextProviderWithDefaults>,
      );

      expect(testInstance).toMatchSnapshot();
    });
  });
};
