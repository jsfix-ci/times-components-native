import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

// import data from "../../data.json"; // static data for testing new slice bullet data
import Section from "./section";

const SectionPage = props => {
  return (
    <Section
      {...props}
      section={JSON.parse(props.section)}
      puzzlesMetaData={
        Platform.OS === "android"
          ? JSON.parse(props.puzzlesMetaData)
          : props.puzzlesMetaData
      }
    />
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
