import { TextPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

const { style: StylePropType } = TextPropTypes;
export const basePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: StylePropType,
  target: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const baseDefaultProps = {
  style: {},
  target: null,
};
