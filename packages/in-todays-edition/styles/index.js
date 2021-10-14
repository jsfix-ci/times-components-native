import { fonts, spacing, colours } from "@times-components-native/styleguide";
import { getStyleByDeviceSize } from "@times-components-native/styleguide/src/styleguide";

const sharedStyles = {
  container: {
    paddingVertical: spacing(3),
    backgroundColor: colours.functional.buff,
    flex: 1,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colours.functional.buffKeyline,
    paddingBottom: 3,
  },
  heading: {
    fontFamily: fonts.bodyRegular,
    letterSpacing: 1,
    color: colours.functional.brandColour,
    fontWeight: "bold",
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: fonts.headline,
    color: colours.functional.brandColour,
  },
  itemStrapline: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: fonts.bodyRegular,
    color: colours.functional.brandColour,
  },
};

const sharedPortraitStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: 13,
    paddingHorizontal: spacing(4),
  },
  heading: {
    ...sharedStyles.heading,
    fontSize: 13,
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: spacing(2),
  },
  item: {
    flex: 1,
    marginRight: spacing(2),
  },
  itemTitle: {
    ...sharedStyles.itemTitle,
    marginBottom: 4,
  },
  itemStrapline: {
    ...sharedStyles.itemStrapline,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: spacing(1),
  },
  itemLast: {
    marginRight: 0,
  },
  divider: {
    paddingLeft: spacing(2),
    borderColor: colours.functional.buffKeyline,
    borderLeftWidth: 1,
    marginHorizontal: spacing(1),
  },
};

const sharedLandscapeStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingHorizontal: spacing(4),
  },
  titleContainer: {
    ...sharedStyles.titleContainer,
    paddingBottom: spacing(2),
  },
  heading: {
    ...sharedStyles.heading,
    fontSize: 14,
  },
  item: {
    ...sharedStyles.item,
    paddingTop: spacing(2),
  },
  itemTitle: {
    ...sharedStyles.itemTitle,
    fontSize: 18,
    marginBottom: spacing(1),
  },
  itemStrapline: {
    ...sharedStyles.itemStrapline,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: spacing(2),
  },
  itemCTA: {
    flexDirection: "row",
  },
  itemCTAText: {
    fontSize: 13,
    fontFamily: fonts.supporting,
    color: colours.functional.red,
    textDecorationLine: "none",
    marginBottom: spacing(3),
  },
  itemCTAIconContainer: {
    marginLeft: spacing(1),
    marginTop: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colours.functional.buffKeyline,
  },
};

// export const getStyles = (orientation, windowWidth) =>
//   getStyleByDeviceSize(styles[orientation], windowWidth);

export const getStyles = () => ({
  container: {
    borderColor: "green",
    borderWidth: 1,
    paddingVertical: spacing(3),
    backgroundColor: colours.functional.buff,
    flex: 1,
  },
  divider: {
    paddingLeft: spacing(2),
    borderColor: colours.functional.buffKeyline,
    borderLeftWidth: 1,
    marginHorizontal: spacing(1),
  },
  heading: {
    fontFamily: fonts.bodyRegular,
    letterSpacing: 1,
    color: colours.functional.brandColour,
  },
  itemsContainer: {
    borderColor: "green",
    borderWidth: 1,
    flex: 1,
    marginTop: spacing(2),
  },
  item: {
    marginRight: spacing(2),
  },
  itemLast: {
    marginRight: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: fonts.headline,
    color: colours.functional.brandColour,
  },
  itemStrapline: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: fonts.bodyRegular,
    color: colours.functional.brandColour,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colours.functional.buffKeyline,
    paddingBottom: 3,
  },
});
