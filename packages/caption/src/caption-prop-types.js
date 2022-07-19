import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: ViewPropTypesStyle,
  text: PropTypes.string,
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: "",
};
