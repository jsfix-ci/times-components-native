import PropTypes from "prop-types";

export const propTypes = {
  ast: PropTypes.object.isRequired,
  onLinkPress: PropTypes.func,
  analyticsStream: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
};

export const defaultProps = {
  onLinkPress: () => null,
};
