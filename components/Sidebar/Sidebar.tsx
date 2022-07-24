import { Box, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ToggleColorMode from "components/ToggleColorMode";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { HiOutlineGift } from "react-icons/hi";

const SIDEBAR_LINKS = [
  {
    name: "Collections",
    icon: HiOutlineGift,
    href: "/collections",
  },
];

const SidebarItem = ({ href, children, ...props }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <NextLink href={href} passHref>
      <Button
        variant="ghost"
        colorScheme="gray"
        size="lg"
        fontWeight={router.pathname === href ? 700 : 500}
        gap={4}
        fontSize="2xl"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        _hover={{
          textDecoration: "none",
          bgColor: colorMode === "light" ? "gray.100" : "gray.700",
        }}
        {...props}
      >
        {children}
      </Button>
    </NextLink>
  );
};

const Sidebar = () => {
  return (
    <Box py={4} maxW="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        h="100%"
      >
        <Box>
          <SidebarItem href="/">
            <Heading
              fontWeight={800}
              fontStyle="italic"
              lineHeight={1}
              bgGradient="linear(to-br, orange.500, pink.500)"
              bgClip="text"
              display="inline-block"
              px={4}
            >
              sportcase
            </Heading>
          </SidebarItem>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            my={4}
            gap={2}
          >
            {(SIDEBAR_LINKS || []).map((link, index) => {
              const LinkIcon = link.icon;
              return (
                <SidebarItem key={index} href={link.href}>
                  <Box as="span" fontSize="3xl">
                    <LinkIcon />
                  </Box>{" "}
                  {link.name}
                </SidebarItem>
              );
            })}
          </Box>
          <Flex direction="column" gap={4}>
            <ConnectButton />

            <ToggleColorMode />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
