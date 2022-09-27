import lineHeightMapping from "./line-height-mapping";

const lineHeights = ({ font, fontSize }) => lineHeightMapping[font][fontSize];

export default lineHeights;
