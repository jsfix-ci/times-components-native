import React from "react";
import { editionBreakpoints } from "@times-components-native/styleguide";
import createItem from "./utils";
import { SecondaryFourSlice } from "../src/slice-layout";

export default renderComponent => {
  it(`1. secondary four - small`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });

  it(`2. secondary four - smallTablet`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        breakpoint={editionBreakpoints.smallTablet}
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });

  it(`3. secondary four - medium`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        breakpoint={editionBreakpoints.medium}
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });

  it(`4. secondary four - medium - with isConsecutive`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        breakpoint={editionBreakpoints.medium}
        isConsecutive
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });

  it(`5. secondary four - wide`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        breakpoint={editionBreakpoints.wide}
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });

  it(`6. secondary four - wide - with isConsecutive`, () => {
    const output = renderComponent(
      <SecondaryFourSlice
        isConsecutive
        breakpoint={editionBreakpoints.wide}
        secondary1={createItem("secondary-1")}
        secondary2={createItem("secondary-2")}
        secondary3={createItem("secondary-3")}
        secondary4={createItem("secondary-4")}
      />,
    );

    expect(output).toMatchSnapshot();
  });
};
