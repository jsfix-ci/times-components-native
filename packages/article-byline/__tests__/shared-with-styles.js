import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";
import shared from "./shared-with-styles.base";

export default Component => {
  addSerializers(
    expect,
    compose(print, flattenStyleTransform, minimalNativeTransform),
  );

  shared(Component);
};
