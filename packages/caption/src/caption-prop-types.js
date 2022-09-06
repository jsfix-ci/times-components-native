import { Text } from "react-native";
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import PropTypes from "prop-types";

const { style: TextPropTypesStyle } = Text.propTypes;
const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: ViewPropTypesStyle,
    text: TextPropTypesStyle,
  }),
  text: PropTypes.string,
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: "",
};
