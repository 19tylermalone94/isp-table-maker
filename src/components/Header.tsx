import { Box, Flex, Text, Spacer, useTheme, Link } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';
import ActionButton from './TableBuilder/ActionButton';

type HeaderProps = {
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    <Box as="header" bg={theme.colors.brand[500]} px={6} py={4} boxShadow="md">
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
          <ActionButton label={'View Source'} icon={<FaGithub />} />
        </Link>
        <ActionButton
          label={'Toggle Theme'}
          icon={<MoonIcon />}
          onClick={toggleTheme}
        />
      </Flex>
    </Box>
  );
};

export default Header;
