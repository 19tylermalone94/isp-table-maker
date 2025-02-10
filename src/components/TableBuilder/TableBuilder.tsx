// src/components/TableBuilder/TableBuilder.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
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
  Stack,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ParameterRow from './ParameterRow';
import { useParameters } from '../../hooks/useParameters';
import { AddIcon, CloseIcon, CopyIcon, DownloadIcon } from '@chakra-ui/icons';
import ActionButton from './ActionButton';
import {
  FaFileUpload,
  FaFlask,
  FaQuestionCircle,
  FaTable,
} from 'react-icons/fa';
import sampleParameters from './sample';
import BccTableInteractive from './BccTableInteractive';
import {
  generateMarkdownPreview,
  generateMarkdownCopy,
  generateBccMarkdownWithOracle,
} from './markdownUtils';
import { buildBccTestRows } from './bccHelpers';

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
  const [isBccPreview, setIsBccPreview] = useState(false);
  const oracleValuesRef = useRef<Record<string, string>>({});
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

  const clearParameters = () => {
    if (
      window.confirm(
        'Are you sure you want to clear the table? Unsaved data will be lost.',
      )
    ) {
      setParameters([]);
    }
  };

  const loadSample = () => {
    setParameters(sampleParameters);
    toast({
      title: 'Loaded sample data',
      description: 'Sample JSON has been loaded successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const previewISP = () => {
    setIsBccPreview(false);
    const markdown = generateMarkdownPreview(parameters, theme);
    setMarkdownPreview(markdown);
    onOpen();
  };

  const previewBCC = () => {
    setIsBccPreview(true);
    onOpen();
  };

  const copyToMarkdown = () => {
    const markdown = generateMarkdownCopy(parameters);
    navigator.clipboard.writeText(markdown);
    toast({
      title: 'Copied to clipboard',
      description: 'ISP Table HTML',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const copyBccToMarkdown = () => {
    const markdown = generateBccMarkdownWithOracle(
      parameters,
      oracleValuesRef.current,
      buildBccTestRows,
    );
    if (!markdown) {
      toast({
        title: 'BCC Table not generated',
        description:
          'Please ensure that every characteristic with partitions has a base choice selected.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigator.clipboard.writeText(markdown);
    toast({
      title: 'Copied to clipboard',
      description: 'Test Set HTML',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
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
        console.log(error);
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

  const updateOracleValue = useCallback((testName: string, value: string) => {
    oracleValuesRef.current[testName] = value;
  }, []);

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
            label="View ISP Table"
            icon={<FaTable />}
            onClick={previewISP}
          />
          <ActionButton
            label="View Test Set"
            icon={<FaFlask />}
            onClick={previewBCC}
          />
          <ActionButton
            label="Export JSON"
            icon={<DownloadIcon />}
            onClick={exportToJson}
          />
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
            onClick={() => fileInputRef.current?.click()}
          />
          <ActionButton
            label="Load Sample"
            icon={<FaQuestionCircle />}
            onClick={loadSample}
          />
          <ActionButton
            label="Clear Table"
            icon={<CloseIcon />}
            onClick={clearParameters}
            variant="delete"
          />
        </HStack>

        <Box
          boxShadow="lg"
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
                <Th color={theme.colors.text.primary}>Base</Th>
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

      <Modal isOpen={isOpen} onClose={onClose} size="lg" autoFocus={false}>
        <ModalOverlay />
        <ModalContent
          bg={theme.colors.background.primary}
          maxW="90vw"
          maxH="90vh"
        >
          <ModalHeader
            bg={theme.colors.background.secondary}
            color={theme.colors.text.primary}
          >
            <Stack align="start">
              <Text>
                {isBccPreview
                  ? 'Base Choice Coverage Test Set'
                  : 'ISP Table Preview'}
              </Text>
              {isBccPreview ? (
                <ActionButton
                  label="Copy Test Set"
                  icon={<CopyIcon />}
                  onClick={copyBccToMarkdown}
                />
              ) : (
                <ActionButton
                  label="Copy ISP Table"
                  icon={<CopyIcon />}
                  onClick={copyToMarkdown}
                />
              )}
            </Stack>
          </ModalHeader>
          <ModalCloseButton color={theme.colors.text.primary} />
          <ModalBody
            bg={theme.colors.background.primary}
            maxH="70vh"
            overflow="auto"
          >
            <Box mt={3} p={3} overflow="auto">
              {isBccPreview ? (
                <BccTableInteractive
                  parameters={parameters}
                  oracleValues={oracleValuesRef.current}
                  updateOracleValue={updateOracleValue}
                />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
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
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableBuilder;
