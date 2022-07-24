import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      colorScheme="gray"
      aria-label="Toggle color mode"
      leftIcon={colorMode === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
};

export default ToggleColorMode;
