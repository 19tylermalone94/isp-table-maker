import { Box, Flex, IconButton, Text, Spacer, useTheme } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

type HeaderProps = {
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  
  return (
    <Box as="header" bg={theme.colors.brand[600]} px={6} py={4} boxShadow="md">
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color={theme.colors.text.primary}>
          ISP Table Maker
        </Text>
        <Spacer />
        <IconButton
          aria-label="Cycle themes"
          icon={<RepeatIcon color={theme.colors.text.primary} fontSize="lg" />}
          onClick={toggleTheme}
          bg="transparent"
          _hover={{ bg: theme.colors.brand[500] }}
        />
      </Flex>
    </Box>
  );
};

export default Header;
