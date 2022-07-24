import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import Button from "./Button";
import colors from "./colors";
// overrides
import config from "./config";
import fonts from "./fonts";
import fontSizes from "./fontSizes";
// components
import Input from "./Input";
import Menu from "./Menu";
import Modal from "./Modal";
import Popover from "./Popover";
import radii from "./radii";
import shadows from "./shadows";
import Skeleton from "./Skeleton";
import styles from "./styles";
import Tabs from "./Tabs";
import Textarea from "./Textarea";

const overrides = {
  config,
  styles,
  colors,
  fonts,
  fontSizes,
  shadows,
  radii,
  components: { Input, Textarea, Button, Tabs, Modal, Skeleton, Menu, Popover },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({
    colorScheme: "pink",
    components: [
      "Alert",
      "Avatar",
      "Button",
      "Badge",
      "Checkbox",
      "CircularProgress",
      "Progress",
      "Radio",
      "RangeSlider",
      "Slider",
      "Spinner",
      "Switch",
      "Tabs",
      "Tag",
    ],
  })
);
