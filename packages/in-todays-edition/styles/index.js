import { fonts, spacing, colours } from "@times-components-native/styleguide";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(4),
    backgroundColor: colours.functional.buff,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colours.functional.buffKeyline,
    paddingBottom: 3,
    marginBottom: 10,
  },
  header: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    letterSpacing: 1,
    color: colours.functional.brandColour,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    marginRight: spacing(2),
  },
  itemLast: {
    marginRight: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: fonts.headline,
    color: colours.functional.brandColour,
    marginBottom: spacing(1),
  },
  itemStrapline: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: fonts.bodyRegular,
    color: colours.functional.brandColour,
  },
  itemCTA: {
    flexDirection: "row",
    marginTop: spacing(1),
  },
  itemCTAText: {
    fontSize: 13,
    fontFamily: fonts.supporting,
    color: colours.functional.red,
    textDecorationLine: "none",
    marginBottom: spacing(2),
  },
  itemCTAIconContainer: {
    marginLeft: spacing(1),
    marginTop: 2,
  },
  divider: {
    paddingLeft: spacing(1),
    borderColor: colours.functional.buffKeyline,
    borderLeftWidth: 1,
    marginHorizontal: spacing(1),
  },
});
