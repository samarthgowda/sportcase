// Redux
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { providers } from "ethers";
// Appolo Client
import Fonts from "styles/fonts";
// UI
import theme from "styles/theme";
// WAGMI
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "sportcase",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  // provider,
  provider(config) {
    return new providers.InfuraProvider(
      config.chainId,
      "96cdc33b3ce4495e9b3eb062eb43d7e2"
    );
  },
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={lightTheme({
            borderRadius: "large",
          })}
        >
          <ChakraProvider resetCSS theme={theme}>
            <Fonts />
            <Box width="100%" height="100vh" overflow="auto" position="fixed">
              {getLayout(<Component {...pageProps} />)}
            </Box>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
