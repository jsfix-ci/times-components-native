import "./mocks";
import React from "react";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";
import TestRenderer from "react-test-renderer";
import Responsive from "@times-components-native/responsive";

import shared from "./shared-with-style.base";

jest.mock("@times-components-native/image", () => ({
  ModalImage: "ModalImage",
}));

export default () => {
  addSerializers(
    expect,
    compose(print, flattenStyleTransform, minimalNativeTransform),
  );

  shared(component =>
    TestRenderer.create(<Responsive>{component}</Responsive>).toJSON(),
  );
};
