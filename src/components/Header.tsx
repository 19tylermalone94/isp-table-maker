import { Box, Flex, IconButton, Text, Spacer, useTheme, Link } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

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
        <Link 
          href="https://github.com/19tylermalone94/isp-table-maker" 
          isExternal
          aria-label="GitHub Repository"
          mx={4}
        >
          <IconButton
            icon={<FaGithub />}
            aria-label="GitHub Repository"
            bg="transparent"
            color={theme.colors.text.primary}
            _hover={{ bg: theme.colors.brand[500] }}
          />
        </Link>
        <IconButton
          aria-label="Cycle themes"
          icon={<MoonIcon color={theme.colors.text.primary} fontSize="lg" />}
          onClick={toggleTheme}
          bg="transparent"
          _hover={{ bg: theme.colors.brand[500] }}
        />
      </Flex>
    </Box>
  );
};

export default Header;
