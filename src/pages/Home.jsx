import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import FinancialEducationPortal from '../components/FinancialEducationPortal';

const Home = () => {
  return (
    <Flex>
      <Box ml="200px"> {/* Content should start after the sidebar */}
        <FinancialEducationPortal />
      </Box>
    </Flex>
  );
};

export default Home;