import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "rgb(15, 15, 15)")(props),
    },
  }),
};

export default styles;
