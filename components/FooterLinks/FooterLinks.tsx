import {
  Link,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";

const FOOTER_LINKS = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
  {
    name: "Terms",
    href: "/terms",
  },
  {
    name: "Donate",
    href: "/donate",
  },
  {
    name: "Roadmap",
    href: "/roadmap",
  },
  {
    name: "Discord",
    href: "/discord",
  },
];

const FooterLinks = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Wrap spacing={3} flexWrap="wrap" lineHeight={1.1}>
      <WrapItem pr={2}>
        <Text
          fontSize="sm"
          fontWeight={500}
          bgGradient="linear(to-r, blue.400, pink.400)"
          bgClip="text"
        >
          © sportcase
        </Text>
      </WrapItem>
      {(FOOTER_LINKS || []).map((link, index) => {
        return (
          <WrapItem key={index} pr={2}>
            <NextLink href={link.href} passHref>
              <Link fontSize="sm" fontWeight={500} color={textColor}>
                {link.name}
              </Link>
            </NextLink>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default FooterLinks;
