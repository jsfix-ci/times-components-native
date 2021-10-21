import PropTypes from "prop-types";

export const propTypes = {
  data: PropTypes.shape({}),
  height: PropTypes.number.isRequired,
  onRenderComplete: PropTypes.func,
  onRenderError: PropTypes.func,
  width: PropTypes.number.isRequired,
};

export const defaultProps = {
  data: {},
  height: 0,
  onRenderComplete: () => null,
  onRenderError: () => null,
};
