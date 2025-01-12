import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { leadConfig, supportConfig } from "./config";
import styles from "../styles";

const LeadOneAndTwoSlice = ({ renderLead, renderSupport1, renderSupport2 }) => {
  const support1 = renderSupport1(supportConfig);
  const support2 = renderSupport2(supportConfig);
  const supports = [support1, support2];
  const filteredSupports = supports.filter(support => support);

  return (
    <View style={styles.container}>
      <View
        style={
          filteredSupports.length === 0
            ? styles.itemContainerWithoutBorders
            : styles.itemContainer
        }
      >
        <View style={styles.item}>{renderLead(leadConfig)}</View>
      </View>
      {filteredSupports.map((support, index) => (
        <View
          key={support.props.id}
          style={
            index === filteredSupports.length - 1
              ? styles.itemContainerWithoutBorders
              : styles.itemContainer
          }
        >
          <View style={styles.item}>{support}</View>
        </View>
      ))}
    </View>
  );
};

LeadOneAndTwoSlice.propTypes = {
  renderLead: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired,
};

export default LeadOneAndTwoSlice;
