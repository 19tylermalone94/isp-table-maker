import { Tooltip, IconButton, useTheme } from '@chakra-ui/react';
import { ReactElement } from 'react';

type ActionButtonProps = {
  label: string;
  icon: ReactElement;
  onClick?: () => void;
  variant?: 'default' | 'delete';
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  variant = 'default',
}) => {
  const theme = useTheme();
  const color = variant === 'delete' ? theme.colors.delete : theme.colors.brand;

  return (
    <Tooltip label={label} placement="top-start">
      <IconButton
        icon={icon}
        aria-label={label}
        color={theme.colors.text.primary}
        bg={color[500]}
        _hover={{ bg: color[600] }}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ActionButton;
