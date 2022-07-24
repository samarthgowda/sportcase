import { Flex, Image } from "@chakra-ui/react";
import Layout from "components/Layout";
import Seo from "components/Seo";

const Home = () => {
  return (
    <>
      <Seo />
      <Flex w="100%" h="100%" gap={{ base: 4, md: 8 }}>
        <Image
          alt="seo-image"
          src="/images/seo-image.png"
          h={500}
          rounded="xl"
          w="100%"
        />
      </Flex>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
