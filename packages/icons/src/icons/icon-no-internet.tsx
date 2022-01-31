import * as React from "react";
import Svg, { SvgProps, Defs, Path, G, Mask, Use } from "react-native-svg";

function IconNoInternet(props: SvgProps) {
  return (
    <Svg width={16} height={13} {...props}>
      <Defs>
        <Path
          d="m1.334 1.033.94-.94 11.314 11.314-.94.94-4.72-4.72A4.666 4.666 0 0 0 4.668 9L3.334 7.667a6.549 6.549 0 0 1 2.94-1.694L4.781 4.48a8.432 8.432 0 0 0-2.78 1.853L.668 5a10.468 10.468 0 0 1 2.7-1.933L1.334 1.033Zm14 3.967-1.333 1.333a8.498 8.498 0 0 0-6.08-2.486l-1.72-1.72c3.22-.56 6.647.386 9.133 2.873Zm-5.146 1.113c.906.32 1.76.834 2.48 1.554l-.467.46-2.013-2.014ZM6 10.333l2 2 2-2a2.825 2.825 0 0 0-4 0Z"
          id="a"
        />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          fill="#333"
          fillRule="nonzero"
          mask="url(#b)"
          d="M.001-1h16v16h-16z"
        />
      </G>
    </Svg>
  );
}

export default IconNoInternet;
