import {
  ViewPropTypes,
  TextPropTypes,
} from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    text: TextPropTypes.style,
  }),
  text: PropTypes.string,
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: "",
};
