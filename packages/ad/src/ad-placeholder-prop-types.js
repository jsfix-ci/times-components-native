import PropTypes from "prop-types";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

export const propTypes = {
  height: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  width: PropTypes.number.isRequired,
};

export const defaultProps = {
  style: null,
};
