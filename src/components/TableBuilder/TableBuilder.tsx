import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
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
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ParameterRow from './ParameterRow';
import { useParameters } from '../../hooks/useParameters';
import { AddIcon, CopyIcon, DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import ActionButton from './ActionButton';
import { FaFileUpload } from 'react-icons/fa';

const TableBuilder: React.FC = () => {
  const {
    parameters,
    setParameters,
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
  const [markdownPreview, setMarkdownPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        'Are you sure you want to leave? Unsaved changes will be lost.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
          markdown += `| ${charIndex === 0 ? param.name : ''} | ${char.name} | - | - |\n`;
          return;
        }

        char.partitions.forEach((part, partIndex) => {
          markdown += `| ${charIndex === 0 && partIndex === 0 ? param.name : ''} | ${
            partIndex === 0 ? char.name : ''
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
      title: 'Copied to clipboard',
      description: 'Markdown table copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const previewMarkdown = () => {
    const markdown = generateMarkdown();
    setMarkdownPreview(markdown);
    onOpen();
  };

  const exportToJson = () => {
    const jsonString = JSON.stringify(parameters, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'table-data.json';
    a.click();
    toast({
      title: 'Exported successfully',
      description: 'Your table has been saved as a JSON file.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const importFromJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setParameters(importedData);
        toast({
          title: 'Imported successfully',
          description: 'Your table has been loaded from the JSON file.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'Invalid JSON format.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    };
    reader.readAsText(file);
  };


  const getTableBorderColor = () => {
    if (theme.colors.neonGreen) return theme.colors.neonGreen;
    if (theme.colors.accent && theme.colors.accent[500])
      return theme.colors.accent[500];
    if (theme.colors.brand && theme.colors.brand[500])
      return theme.colors.brand[500];
    return '#ddd';
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
          <ActionButton
            label="Add Parameter"
            icon={<AddIcon />}
            onClick={addParameter}
          />
          <ActionButton
            label="Copy Markdown"
            icon={<CopyIcon />}
            onClick={copyToMarkdown}
          />
          <ActionButton
            label="Preview Markdown"
            icon={<ViewIcon />}
            onClick={previewMarkdown}
          />
          <ActionButton label="Export JSON" icon={<DownloadIcon />} onClick={exportToJson} />
          <Input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importFromJson}
            style={{ display: 'none' }}
          />
          
          <ActionButton
            label="Import JSON"
            icon={<FaFileUpload />}
            onClick={() => fileInputRef.current?.click()} // ✅ Manually open file explorer
          />
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
                  table: ({ ...props }) => (
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginBottom: '1em',
                      }}
                      {...props}
                    />
                  ),
                  th: ({ ...props }) => (
                    <th
                      style={{
                        border: `1px solid ${tableBorderColor}`,
                        padding: '8px',
                        backgroundColor:
                          theme.colors.background.secondary || '#f2f2f2',
                        color: theme.colors.text.primary,
                      }}
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td
                      style={{
                        border: `1px solid ${tableBorderColor}`,
                        padding: '8px',
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableBuilder;
