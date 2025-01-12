import React from "react";
import { iterator } from "@times-components-native/test-utils";
import createItem from "./utils";
import { ListVerticalLayout } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "no child elements",
      test() {
        const wrapper = renderComponent(<ListVerticalLayout tiles={[]} />);

        expect(wrapper).toMatchSnapshot();
      },
    },
    {
      name: "a single child element",
      test() {
        const wrapper = renderComponent(
          <ListVerticalLayout tiles={[createItem("standard-1")]} />,
        );

        expect(wrapper).toMatchSnapshot();
      },
    },
    {
      name: "two child elements",
      test() {
        const wrapper = renderComponent(
          <ListVerticalLayout
            tiles={[
              // eslint-disable-next-line
              <test key="0" tile={{ article: { id: "testId" } }} />,
              createItem("standard-1"),
              createItem("standard-2"),
            ]}
          />,
        );
        expect(wrapper).toMatchSnapshot();
      },
    },
    {
      name: "three child elements",
      test() {
        const wrapper = renderComponent(
          <ListVerticalLayout
            tiles={[
              createItem("standard-1"),
              createItem("standard-2"),
              createItem("standard-3"),
            ]}
          />,
        );

        expect(wrapper).toMatchSnapshot();
      },
    },
  ];

  iterator(tests);
};
