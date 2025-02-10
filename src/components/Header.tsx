import {
  Box,
  Flex,
  Text,
  Spacer,
  useTheme,
  Link,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';

type HeaderProps = {
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    <Box as="header" bg={theme.colors.brand[500]} px={6} py={4} boxShadow="md">
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color={theme.colors.text.primary}>
          Input Space Partitioning & Test Table Maker
        </Text>
        <Spacer />
        <Link
          href="https://github.com/19tylermalone94/isp-table-maker"
          isExternal
          aria-label="GitHub Repository"
          mx={4}
        >
          <Tooltip label="View Source" placement="bottom-end">
            <IconButton
              icon={<FaGithub />}
              aria-label="View Source"
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.text.primary[600] }}
              bg="transparent"
            />
          </Tooltip>
        </Link>
        <Tooltip label="Toggle Theme" placement="bottom-end">
          <IconButton
            icon={<MoonIcon />}
            aria-label="Toggle Theme"
            color={theme.colors.text.primary}
            _hover={{ bg: theme.colors.text.primary[600] }}
            bg="transparent"
            onClick={toggleTheme}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Header;
