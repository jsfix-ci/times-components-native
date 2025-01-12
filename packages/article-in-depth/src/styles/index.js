import { StyleSheet } from "react-native";
import styleguide, {
  tabletWidth,
  tabletWidthMax,
} from "@times-components-native/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = StyleSheet.create({
  articleHeadline: {
    ...fontFactory({
      font: "headline",
      fontSize: "headline",
    }),
    color: colours.functional.brandColour,
    marginBottom: spacing(2),
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    paddingTop: spacing(9),
    paddingBottom: spacing(8),
    paddingHorizontal: spacing(4),
  },
  containerTablet: {
    alignSelf: "center",
    maxWidth: tabletWidthMax,
  },
  datePublication: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta",
    }),
    color: colours.functional.secondary,
  },
  datePulicationTablet: {
    marginTop: spacing(0),
  },
  headerText: {
    alignItems: "center",
  },
  headerTextTablet: {
    width: tabletWidth,
  },
  labelTablet: {
    marginBottom: spacing(2),
  },
  leadAsset: {
    marginBottom: spacing(0),
  },
  leadAssetTablet: {
    alignSelf: "center",
    maxWidth: tabletWidthMax,
    width: "100%",
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  metaContainer: {
    alignItems: "center",
    marginHorizontal: spacing(2),
    paddingVertical: spacing(2),
    marginVertical: spacing(4),
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
  },
  metaContainerTablet: {
    alignSelf: "center",
    width: tabletWidth,
  },
  metaContainerTabletFlow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  separator: {
    borderRightColor: colours.functional.keyline,
    borderRightWidth: 1,
    height: spacing(3),
    marginRight: spacing(2),
    paddingLeft: spacing(2),
  },
  standFirst: {
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallestHeadline",
    }),
    color: colours.functional.primary,
    paddingHorizontal: spacing(2),
    textAlign: "center",
    lineHeight: 25,
  },
});

export default styles;
