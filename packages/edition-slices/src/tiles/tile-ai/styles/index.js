import {
  spacing,
  editionBreakpoints,
} from "@times-components-native/styleguide";

const keylinePadding = {
  [editionBreakpoints.smallTablet]: spacing(2),
  [editionBreakpoints.medium]: spacing(2),
  [editionBreakpoints.wide]: spacing(3),
  [editionBreakpoints.huge]: spacing(3),
};

const styles = breakpoint => ({
  container: {
    alignItems: "center",
    padding: spacing(2),
    paddingLeft: keylinePadding[breakpoint],
  },
  imageContainer: {
    width: "100%",
  },
});

export default styles;
