import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import Responsive from "@times-components-native/responsive";
import data from "../../data.json"; // static data for testing new slice bullet data
import Section from "./section";

/** When the section contains 'container' or collection, the slice or slices
 * in question will have the name "ContainerSlice", and will have an array of
 * slices nested within a .collection.slices array within that object.
 *
 * Collection slices are laid out (in the UI) just like normal slices, but with a
 * container around them. Because of this, we want to pass these inner slices to
 * the Section component in the same manner as regular slices (in the same array),
 * with a property (well - properties) added to indicate they are part of a container.
 *
 * This function applies that transformation
 */
export const flattenSlices = entity => {
  return entity.slices.reduce((slicesArr, slice) => {
    if (slice.name === "ContainerSlice") {
      const innerSlices = slice.collection.slices;
      const subSlices = innerSlices.map((innerSlice, i) => ({
        ...innerSlice,
        isInContainer: true,
        isFirstInContainer: !i,
        isLastInContainer: i === innerSlices.length - 1,
        containerTitle: slice.collection.title,
      }));
      return [...slicesArr, ...subSlices];
    }

    return [...slicesArr, slice];
  }, []);
};

const SectionPage = props => {
  /**
   * NOTE: data is used just for testing / demonstrating collections
   * Before merging/release this will change to JSON.parse(props.section)
   */
  const section = data;

  const slices = flattenSlices(section);

  const sectionToUse = {
    ...section,
    slices,
  };

  return (
    <Responsive>
      <Section
        {...props}
        section={sectionToUse}
        puzzlesMetaData={
          Platform.OS === "android"
            ? JSON.parse(props.puzzlesMetaData)
            : props.puzzlesMetaData
        }
      />
    </Responsive>
  );
};

SectionPage.propTypes = {
  publicationName: PropTypes.string,
  recentlyOpenedPuzzleCount: PropTypes.number,
  section: PropTypes.string.isRequired,
};

SectionPage.defaultProps = {
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0,
};

export default SectionPage;
