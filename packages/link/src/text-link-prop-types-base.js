import PropTypes from "prop-types";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const basePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle,
  target: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const baseDefaultProps = {
  style: {},
  target: null,
};
