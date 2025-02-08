import React from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useToast,
  HStack,
  useTheme,
} from "@chakra-ui/react";
import ParameterRow from "./ParameterRow";
import { useParameters } from "../../hooks/useParameters";

const TableBuilder: React.FC = () => {
  const {
    parameters,
    addParameter,
    updateParameter,
    deleteParameter,
    addCharacteristic,
    updateCharacteristic,
    deleteCharacteristic,
    addPartition,
    updatePartition,
    deletePartition,
  } = useParameters();

  const toast = useToast();
  const theme = useTheme();

  const copyToMarkdown = () => {
    let markdown = `| Parameter | Characteristic | Partition | Value |\n`;
    markdown += `|----------|--------------|----------|-------|\n`;

    parameters.forEach((param) => {
      if (param.characteristics.length === 0) {
        markdown += `| ${param.name} | - | - | - |\n`;
        return;
      }

      param.characteristics.forEach((char, charIndex) => {
        if (char.partitions.length === 0) {
          markdown += `| ${charIndex === 0 ? param.name : ""} | ${char.name} | - | - |\n`;
          return;
        }

        char.partitions.forEach((part, partIndex) => {
          markdown += `| ${
            charIndex === 0 && partIndex === 0 ? param.name : ""
          } | ${partIndex === 0 ? char.name : ""} | ${part.name} | ${part.value} |\n`;
        });
      });
    });

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied to clipboard",
      description: "Markdown table copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      p={5}
      h="90vh"
      display="flex"
      flexDirection="column"
      color={theme.colors.text.primary}
    >
      <HStack>
        <Button
          bg={theme.colors.brand[500]}
          color={theme.colors.text.primary}
          onClick={addParameter}
          mb={3}
        >
          Add Parameter
        </Button>
        <Button
          bg={theme.colors.brand[500]}
          color={theme.colors.text.primary}
          onClick={copyToMarkdown}
          mb={3}
        >
          Copy Markdown
        </Button>
      </HStack>

      <Box
        flex="1"
        overflowY="auto"
        border={`1px solid ${theme.colors.brand[900]}`}
        borderRadius="md"
      >
        <Table variant="simple" size="lg">
          <Thead
            position="sticky"
            top="0"
            zIndex="1"
            bg={theme.colors.brand[300]}
            boxShadow="md"
            color={theme.colors.text.primary}
          >
            <Tr>
              <Th color={theme.colors.text.primary}>Parameter</Th>
              <Th color={theme.colors.text.primary}>Characteristic</Th>
              <Th color={theme.colors.text.primary}>Partition</Th>
              <Th color={theme.colors.text.primary}>Value</Th>
              <Th color={theme.colors.text.primary}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {parameters.map((param) => (
              <ParameterRow
                key={param.id}
                parameter={param}
                updateParameter={updateParameter}
                deleteParameter={deleteParameter}
                addCharacteristic={addCharacteristic}
                updateCharacteristic={updateCharacteristic}
                deleteCharacteristic={deleteCharacteristic}
                addPartition={addPartition}
                updatePartition={updatePartition}
                deletePartition={deletePartition}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableBuilder;
