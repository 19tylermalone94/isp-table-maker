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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [markdownPreview, setMarkdownPreview] = useState("");

  const generateMarkdown = (): string => {
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
          markdown += `| ${charIndex === 0 && partIndex === 0 ? param.name : ""} | ${
            partIndex === 0 ? char.name : ""
          } | ${part.name} | ${part.value} |\n`;
        });
      });
    });

    return markdown;
  };

  const copyToMarkdown = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied to clipboard",
      description: "Markdown table copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const previewMarkdown = () => {
    const markdown = generateMarkdown();
    setMarkdownPreview(markdown);
    onOpen();
  };

  const getTableBorderColor = () => {
    if (theme.colors.neonGreen) return theme.colors.neonGreen;
    if (theme.colors.accent && theme.colors.accent[500]) return theme.colors.accent[500];
    if (theme.colors.brand && theme.colors.brand[500]) return theme.colors.brand[500];
    return "#ddd";
  };

  const tableBorderColor = getTableBorderColor();

  return (
    <>
      <Box
        p={5}
        h="90vh"
        display="flex"
        flexDirection="column"
        color={theme.colors.text.primary}
      >
        <HStack spacing={3} mb={3}>
          <Button
            bg={theme.colors.brand[500]}
            color={theme.colors.text.primary}
            onClick={addParameter}
          >
            Add Parameter
          </Button>
          <Button
            bg={theme.colors.brand[500]}
            color={theme.colors.text.primary}
            onClick={copyToMarkdown}
          >
            Copy Markdown
          </Button>
          <Button
            bg={theme.colors.brand[500]}
            color={theme.colors.text.primary}
            onClick={previewMarkdown}
          >
            Preview Markdown
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

      {/* Markdown Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={theme.colors.background.primary}>
          <ModalHeader
            bg={theme.colors.background.secondary}
            color={theme.colors.text.primary}
          >
            Markdown Preview
          </ModalHeader>
          <ModalCloseButton color={theme.colors.text.primary} />
          <ModalBody bg={theme.colors.background.primary}>
            <Box p={4}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, ...props }) => (
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        marginBottom: "1em",
                      }}
                      {...props}
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      style={{
                        border: `1px solid ${tableBorderColor}`,
                        padding: "8px",
                        backgroundColor:
                          theme.colors.background.secondary || "#f2f2f2",
                        color: theme.colors.text.primary,
                      }}
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      style={{
                        border: `1px solid ${tableBorderColor}`,
                        padding: "8px",
                        color: theme.colors.text.primary,
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {markdownPreview}
              </ReactMarkdown>
            </Box>
          </ModalBody>
          <ModalFooter bg={theme.colors.background.primary}>
            <Button
              bg={theme.colors.brand[500]}
              color={theme.colors.text.primary}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableBuilder;
