import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";
import renderKeyFacts from "./shared-render-key-facts";

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
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style"),
    ),
  );

  renderKeyFacts(TestRenderer.create);
};
