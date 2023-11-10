import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/SideBar';

const Home = () => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="200px"> {/* Content should start after the sidebar */}
        Pagina de Inicio
      </Box>
    </Flex>
  );
};

export default Home;













{/* <ChakraProvider theme={theme}>
<Box textAlign="center" fontSize="xl">
  <Grid minH="100vh" p={3}>
    <ColorModeSwitcher justifySelf="flex-end" />
    <VStack spacing={8}>
      <Logo h="40vmin" pointerEvents="none" />
      <Text>
        Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
      </Text>
      <ChakraLink
        color="teal.500"
        href="https://chakra-ui.com"
        fontSize="2xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Chakra
      </ChakraLink>
    </VStack>
  </Grid>
</Box>
</ChakraProvider> */}