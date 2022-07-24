import { Box, Container } from "@chakra-ui/react";
import Sidebar from "components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box>
      <Container
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        maxW="7xl"
        mx="auto"
        h="100%"
        px={0}
        py={4}
        gap={{ base: 4, md: 8, lg: 16, xl: 20 }}
      >
        <Sidebar />
        <Box flexGrow={1}>{children}</Box>
      </Container>
    </Box>
  );
};

export default Layout;
