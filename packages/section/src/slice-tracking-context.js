import { withTrackingContext } from "@times-components-native/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ index, length, slice }) => ({
      sliceDepth: {
        itemNumber: index + 1,
        total: length,
      },
      sliceName: slice.name,
    }),
    trackingObjectName: "Slice",
  });
