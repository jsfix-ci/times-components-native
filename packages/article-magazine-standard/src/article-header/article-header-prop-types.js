import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  articleId: PropTypes.string.isRequired,
  bylines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      expiryTime: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  onTooltipPresented: PropTypes.func,
  publicationName: PropTypes.string.isRequired,
  publishedTime: PropTypes.string.isRequired,
  standfirst: PropTypes.string,
  tooltips: PropTypes.array,
};

const articleHeaderDefaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  onTooltipPresented: () => null,
  standfirst: null,
  tooltips: [],
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
