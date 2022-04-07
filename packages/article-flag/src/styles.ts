import { spacing, fontFactory } from "@times-components-native/styleguide";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bullet: {
    height: 5,
    width: 5,
  },
  flagPadding: {
    marginRight: spacing(3),
  },
  flagsContainer: {
    marginBottom: spacing(3),
    marginTop: spacing(1),
  },
  flags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing(2),
    alignItems: "center",
  },
  title: {
    ...fontFactory({
      font: "body",
      fontSize: "cardMetaMobile",
    }),
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    includeFontPadding: false,
    marginLeft: spacing(1),
    marginBottom: spacing(0),
    paddingTop: 1,
  },
  view: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default styles;
