import React, { useState } from "react";
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
import ParameterRow, { Parameter } from "./ParameterRow";

const TableBuilder: React.FC = () => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const toast = useToast();
  const theme = useTheme();

  const updateParameter = (paramId: number, updatedParam: Parameter) => {
    setParameters((prev) =>
      prev.map((param) => (param.id === paramId ? updatedParam : param))
    );
  };

  const addParameter = () => {
    setParameters((prev) => [
      ...prev,
      { id: Date.now(), name: "", characteristics: [] },
    ]);
  };

  const deleteParameter = (paramId: number) => {
    setParameters((prev) => prev.filter((param) => param.id !== paramId));
  };

  const deleteCharacteristic = (paramId: number, charId: number) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.id === paramId
          ? {
              ...param,
              characteristics: param.characteristics.filter(
                (char) => char.id !== charId
              ),
            }
          : param
      )
    );
  };

  const deletePartition = (
    paramId: number,
    charId: number,
    partId: number
  ) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.id === paramId
          ? {
              ...param,
              characteristics: param.characteristics.map((char) =>
                char.id === charId
                  ? {
                      ...char,
                      partitions: char.partitions.filter(
                        (part) => part.id !== partId
                      ),
                    }
                  : char
              ),
            }
          : param
      )
    );
  };

  const copyToMarkdown = () => {
    let markdown = `| Variable | Characteristic | Partition | Value |\n`;
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
          markdown += `| ${charIndex === 0 && partIndex === 0 ? param.name : ""} | ${
            partIndex === 0 ? char.name : ""
          } | ${part.name} | ${part.value} |\n`;
        });
      });
    });

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied to clipboard",
      description: "Markdown table with borders copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} h="90vh" display="flex" flexDirection="column" color={theme.colors.text.primary}>
      <HStack>
        <Button bg={theme.colors.brand[500]} color={theme.colors.text.primary} onClick={addParameter} mb={3}>
          Add Parameter
        </Button>
        <Button bg={theme.colors.brand[500]} color={theme.colors.text.primary} onClick={copyToMarkdown} mb={3}>
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
                deleteCharacteristic={deleteCharacteristic}
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
