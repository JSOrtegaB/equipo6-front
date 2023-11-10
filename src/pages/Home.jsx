import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex>
      <Box ml="200px"> {/* Content should start after the sidebar */}
        Pagina de Inicio
      </Box>
    </Flex>
  );
};

export default Home;