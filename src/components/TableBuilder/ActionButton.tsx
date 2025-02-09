import { ViewIcon } from "@chakra-ui/icons";
import { Tooltip, IconButton, theme, useTheme } from "@chakra-ui/react";
import { ReactElement } from "react";
import { IconType } from "react-icons";

type ActionButtonProps = {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  variant?: "default" | "delete";
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  variant = "default"
}) => {
  const theme = useTheme();
  
  
  return (
    <Tooltip label={label} placement="top-start">
      <IconButton
        icon={icon}
        aria-label={label}
        bg={variant === "delete" ? theme.colors.delete[500] : theme.colors.brand[500]}
        color={theme.colors.text.primary}
        _hover={{ bg: {...variant === "delete" ? theme.colors.delete[600] : theme.colors.brand[600]}}}
        onClick={onClick}
      />
    </Tooltip>
  )
};

export default ActionButton;