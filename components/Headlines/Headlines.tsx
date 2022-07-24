import {
  Divider,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

const HEADLINES_LIST = [
  {
    postedDate: "2 days ago",
    title: "Sources: Warriors, Looney agree to 3-year deal",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Sources: Kings acquire Huerter for 2 players, pick",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Sources: Celtics get Brogdon in trade with Pacers",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Pac-12 eyeing expansion after UCLA, USC exit",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Cavaliers bring back Rubio, bring in R. Lopez",
  },
  {
    postedDate: "2 days ago",
    title: "Sources: Warriors, Looney agree to 3-year deal",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Sources: Kings acquire Huerter for 2 players, pick",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Sources: Celtics get Brogdon in trade with Pacers",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Pac-12 eyeing expansion after UCLA, USC exit",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Cavaliers bring back Rubio, bring in R. Lopez",
    id: "1983y248th2",
  },
  {
    postedDate: "2 days ago",
    title: "Knicks, Robinson agree to 4-year, $60M contract",
    id: "1983y248th2",
  },
];

const Headlines = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      pt={{ base: 6, md: 12 }}
    >
      <Heading as="h4" fontSize="lg">
        Top Headlines
      </Heading>
      <Divider my={4} />
      <List spacing={4} textAlign="left">
        {(HEADLINES_LIST || []).map((headline, index) => {
          return (
            <ListItem key={index} lineHeight={1.1}>
              <ListIcon as={HiArrowSmRight} color={textColor} />
              <NextLink href={`/story/${headline.id}`} passHref>
                <Link fontSize="sm" fontWeight={500} color={textColor}>
                  {headline.title}
                </Link>
              </NextLink>
            </ListItem>
          );
        })}
      </List>
      <Divider my={4} />
    </Flex>
  );
};

export default Headlines;
