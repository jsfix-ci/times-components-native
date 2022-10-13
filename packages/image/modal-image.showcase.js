/* eslint-disable react/no-danger, react/prop-types */
import React, { Fragment } from "react";
import { Text } from "@times-components-native/text";
import ModalImage from "./src/modal-image";

const uri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78";

export default {
  children: [
    {
      component: () => (
        <Fragment>
          <Text>Click on the image to open the modal</Text>
          <ModalImage
            aspectRatio={16 / 9}
            caption={{
              text: "An example caption",
              credits: "Example credits",
            }}
            uri={uri}
          />
        </Fragment>
      ),
      name: "Default",
      platform: "native",
      type: "story",
    },
  ],
  name: "Primitives/modal-image",
};
