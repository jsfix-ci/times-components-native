import React from "react";
import Text from "./Text";
import TextLink from "./TextLink";

interface ComponentPickerProps {
  component: "Text" | "Link";
  props: any;
  children: any;
}

const ComponentPicker = ({
  component,
  children,
  props,
}: ComponentPickerProps) => {
  console.log(component, props);
  if (component === "Text") return <Text {...props}>{children}</Text>;
  if (component === "Link") return <TextLink {...props}>{children}</TextLink>;
  return null;
};

export default ComponentPicker;
