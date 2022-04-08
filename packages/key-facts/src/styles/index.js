import { StyleSheet } from "react-native";
import styleguide from "@times-components-native/styleguide";

const { colours, fontFactory, fonts, spacing } = styleguide();

export default StyleSheet.create({
  bullet: {
    backgroundColor: colours.functional.darkRed,
    height: 6,
    top: 2,
    width: 6,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%",
  },
  container: {
    backgroundColor: colours.functional.backgroundPrimary,
    borderTopWidth: 2,
    borderColor: colours.functional.darkRed,
    marginHorizontal: spacing(2),
    paddingHorizontal: 24,
    marginVertical: spacing(1),
    paddingVertical: 16,
  },
  containerTablet: {
    alignSelf: "center",
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: spacing(2),
    width: "80.8%",
  },
  link: {
    color: colours.functional.action,
  },
  text: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "body",
      fontSize: "secondary",
    }),
    marginTop: -8,
    paddingLeft: spacing(3),
    width: "95%",
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: 24,
    marginBottom: spacing(4),
  },
  wrapper: {
    flex: 1,
  },
});
