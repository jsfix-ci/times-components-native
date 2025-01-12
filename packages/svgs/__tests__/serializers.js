import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform,
} from "@times-components-native/jest-serializer";
import { hash } from "@times-components-native/test-utils";

const longValues = new Set(["d", "transform"]);

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    minimaliseTransform(value => value === null),
    flattenStyleTransform,
    replacePropTransform((value, key) =>
      longValues.has(key) ? hash(JSON.stringify(value)) : value,
    ),
  ),
);
