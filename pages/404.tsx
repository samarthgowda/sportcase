import { Button, Container, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

export default function FourOhFour() {
  return (
    <Container py={20} centerContent>
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "72%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/1DuTgO2BAubGFpe6R8"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <Heading as="h1" my={6}>
        🤣 Oops, this page does not exist
      </Heading>
      <NextLink href="/" passHref>
        <Button>Go back home</Button>
      </NextLink>
    </Container>
  );
}
