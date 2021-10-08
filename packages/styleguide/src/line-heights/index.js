import lineHeightMapping from "./line-height-mapping";

const lineHeights = ({ font, fontSize }) => {
  return lineHeightMapping[font][fontSize];
};

export default lineHeights;
