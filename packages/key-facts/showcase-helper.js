/* eslint-disable react/prop-types */
import React from "react";
import pick from "lodash.pick";
import { sections } from "@times-components-native/storybook";
import { ContextProviderWithDefaults } from "@times-components-native/context";
import Responsive from "@times-components-native/responsive";
import { colours, scales } from "@times-components-native/styleguide";
import KeyFacts from "./src/key-facts";

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", pick(colours.section, sections), colours.section.default);

const renderKeyFacts = ({ ast, select, hasScaling = false }) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  return (
    <ContextProviderWithDefaults value={{ theme: { scale, sectionColour } }}>
      <Responsive>
        <KeyFacts
          ast={ast}
          onLinkPress={() => null}
          analyticsStream={() => null}
        />
      </Responsive>
    </ContextProviderWithDefaults>
  );
};

export default renderKeyFacts;
