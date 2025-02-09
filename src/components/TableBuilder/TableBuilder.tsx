import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import rehypeRaw from 'rehype-raw';
import ParameterRow from './ParameterRow';
import { useParameters } from '../../hooks/useParameters';
import { AddIcon, CopyIcon, DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import ActionButton from './ActionButton';
import { FaFileUpload, FaFlask } from 'react-icons/fa';
import { Characteristic, Parameter, Partition } from '../../types/types';

interface BccTestRow {
  testName: string;
  characteristicValues: string[];
}

/**
 * OracleInput isolates the text box’s internal state.
 * It uses its own local state (initialized from the passed‑in value)
 * and only notifies the parent (via onBlur) without causing a re‑render.
 */
interface OracleInputProps {
  testName: string;
  initialValue: string;
  onBlur: (value: string) => void;
}

const OracleInput: React.FC<OracleInputProps> = React.memo(
  ({ initialValue, onBlur }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleBlur = () => {
      onBlur(value);
    };

    return (
      <Input
        placeholder="Enter expected value/behavior"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

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

  const generateMarkdownPreview = (): string => {
    const accentColor =
      theme.colors.accent && theme.colors.accent[500]
        ? theme.colors.accent[500]
        : '#d3e7c9';
    let html = `<table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Characteristic</th>
        <th>Partition</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
  `;
    let globalCharIndex = 0;
    parameters.forEach((param) => {
      let paramRows = 0;
      if (param.characteristics.length === 0) {
        paramRows = 1;
      } else {
        param.characteristics.forEach((char) => {
          paramRows += char.partitions.length > 0 ? char.partitions.length : 1;
        });
      }
      let firstParamRow = true;
      param.characteristics.forEach((char) => {
        const characteristicLetter = String.fromCharCode(65 + globalCharIndex);
        globalCharIndex++;
        const characteristicCode = `${characteristicLetter}) ${char.name}`;
        let firstCharRow = true;
        const charRows =
          char.partitions.length > 0 ? char.partitions.length : 1;
        if (char.partitions.length === 0) {
          html += `<tr>
  `;
          if (firstParamRow) {
            html += `      <td rowspan="${paramRows}">${param.name}</td>
  `;
            firstParamRow = false;
          }
          html += `      <td rowspan="${charRows}">${characteristicCode}</td>
        <td>-</td>
        <td>-</td>
      </tr>
  `;
        } else {
          char.partitions.forEach((part, partIndex) => {
            const partitionCode = `${characteristicLetter}${partIndex + 1}) ${part.name}`;
            let partitionCellStyle = '';
            if (part.id === char.basePartitionId) {
              partitionCellStyle = ` style="background-color: ${accentColor};"`;
            }
            html += `<tr>
  `;
            if (firstParamRow) {
              html += `      <td rowspan="${paramRows}">${param.name}</td>
  `;
              firstParamRow = false;
            }
            if (firstCharRow) {
              html += `      <td rowspan="${charRows}">${characteristicCode}</td>
  `;
              firstCharRow = false;
            }
            html += `      <td${partitionCellStyle}>${partitionCode}</td>
        <td>${part.value}</td>
      </tr>
  `;
          });
        }
      });
    });
    html += `  </tbody>
  </table>
  `;
    return html;
  };

  const generateMarkdownCopy = (): string => {
    const fixedGreen = '#d3e7c9';
    let html = `<table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Characteristic</th>
        <th>Partition</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
  `;
    let globalCharIndex = 0;
    parameters.forEach((param) => {
      let paramRows = 0;
      if (param.characteristics.length === 0) {
        paramRows = 1;
      } else {
        param.characteristics.forEach((char) => {
          paramRows += char.partitions.length > 0 ? char.partitions.length : 1;
        });
      }
      let firstParamRow = true;
      param.characteristics.forEach((char) => {
        const characteristicLetter = String.fromCharCode(65 + globalCharIndex);
        globalCharIndex++;
        const characteristicCode = `${characteristicLetter}) ${char.name}`;
        let firstCharRow = true;
        const charRows =
          char.partitions.length > 0 ? char.partitions.length : 1;
        if (char.partitions.length === 0) {
          html += `<tr>
  `;
          if (firstParamRow) {
            html += `      <td rowspan="${paramRows}">${param.name}</td>
  `;
            firstParamRow = false;
          }
          html += `      <td rowspan="${charRows}">${characteristicCode}</td>
        <td>-</td>
        <td>-</td>
      </tr>
  `;
        } else {
          char.partitions.forEach((part, partIndex) => {
            const partitionCode = `${characteristicLetter}${partIndex + 1}) ${part.name}`;
            let partitionCellStyle = '';
            if (part.id === char.basePartitionId) {
              partitionCellStyle = ` style="background-color: ${fixedGreen};"`;
            }
            html += `<tr>
  `;
            if (firstParamRow) {
              html += `      <td rowspan="${paramRows}">${param.name}</td>
  `;
              firstParamRow = false;
            }
            if (firstCharRow) {
              html += `      <td rowspan="${charRows}">${characteristicCode}</td>
  `;
              firstCharRow = false;
            }
            html += `      <td${partitionCellStyle}>${partitionCode}</td>
        <td>${part.value}</td>
      </tr>
  `;
          });
        }
      });
    });
    html += `  </tbody>
  </table>
  `;
    return html;
  };

  const buildBccTestRows = (): BccTestRow[] => {
    const rows: BccTestRow[] = [];
    const globalChars: {
      parameter: Parameter;
      characteristic: Characteristic;
    }[] = [];
    parameters.forEach((param) => {
      param.characteristics.forEach((char) => {
        if (char.partitions && char.partitions.length > 0) {
          globalChars.push({ parameter: param, characteristic: char });
        }
      });
    });
    if (globalChars.length === 0) return rows;
    const incomplete = globalChars.some(
      (gc) => gc.characteristic.basePartitionId == null,
    );
    if (incomplete) return rows;

    const baseRow: BccTestRow = {
      testName: 'T1 (base test)',
      characteristicValues: globalChars.map((gc) => {
        const basePart = gc.characteristic.partitions.find(
          (p: Partition) => p.id === gc.characteristic.basePartitionId,
        );
        return basePart ? basePart.name : '';
      }),
    };
    rows.push(baseRow);
    let testCount = 1;
    globalChars.forEach((gc, charIndex) => {
      const char = gc.characteristic;
      char.partitions.forEach((part: Partition) => {
        if (part.id !== char.basePartitionId) {
          testCount++;
          const row: BccTestRow = {
            testName: `T${testCount}`,
            characteristicValues: globalChars.map((otherGC, j) => {
              if (j === charIndex) {
                return part.name;
              } else {
                const base = otherGC.characteristic.partitions.find(
                  (p: Partition) =>
                    p.id === otherGC.characteristic.basePartitionId,
                );
                return base ? base.name : '';
              }
            }),
          };
          rows.push(row);
        }
      });
    });
    return rows;
  };

  const generateBccMarkdownWithOracle = (): string => {
    const rows = buildBccTestRows();
    if (rows.length === 0) return '';
    const baseValues = rows[0].characteristicValues;
    let html = `<h3>Base Choice Coverage</h3>`;
    html += `<table border="1" cellspacing="0" cellpadding="8">
  <thead>
    <tr>
      <th>Test</th>`;
    rows[0].characteristicValues.forEach((_, index) => {
      html += `<th>Characteristic ${String.fromCharCode(65 + index)}</th>`;
    });
    html += `<th>Oracle</th></tr></thead><tbody>`;
    rows.forEach((row) => {
      html += `<tr>`;
      html += `<td>${row.testName}</td>`;
      row.characteristicValues.forEach((val, index) => {
        const bgColor = baseValues[index] === val ? '#d3e7c9' : 'transparent';
        html += `<td style="background-color: ${bgColor};">${val}</td>`;
      });
      const oracle =
        oracleValuesRef.current[row.testName] || 'expected value/behavior';
      html += `<td>${oracle}</td>`;
      html += `</tr>`;
    });
    html += `</tbody></table>`;
    return html;
  };

  const copyToMarkdown = () => {
    const markdown = generateMarkdownCopy();
    navigator.clipboard.writeText(markdown);
    toast({
      title: 'Copied to clipboard',
      description: 'HTML table copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const copyBccToMarkdown = () => {
    const markdown = generateBccMarkdownWithOracle();
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
      description: 'BCC HTML table copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const previewISP = () => {
    setIsBccPreview(false);
    const markdown = generateMarkdownPreview();
    setMarkdownPreview(markdown);
    onOpen();
  };

  const previewBCC = () => {
    setIsBccPreview(true);
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

  const updateOracleValue = useCallback((testName: string, value: string) => {
    oracleValuesRef.current[testName] = value;
  }, []);

  const BccTableInteractive = React.memo(
    ({
      parameters,
      updateOracleValue,
    }: {
      parameters: Parameter[];
      updateOracleValue: (testName: string, value: string) => void;
    }) => {
      const localTheme = useTheme();
      const getLocalTableBorderColor = () => {
        if (localTheme.colors.neonGreen) return localTheme.colors.neonGreen;
        if (localTheme.colors.accent && localTheme.colors.accent[500])
          return localTheme.colors.accent[500];
        if (localTheme.colors.brand && localTheme.colors.brand[500])
          return localTheme.colors.brand[500];
        return '#ddd';
      };
      const localTableBorderColor = getLocalTableBorderColor();
      const headerStyle = {
        border: `1px solid ${localTableBorderColor}`,
        padding: '8px',
        backgroundColor: localTheme.colors.background.secondary || '#f2f2f2',
        color: localTheme.colors.text.primary,
      };
      const interactiveHighlightColor =
        localTheme.colors.accent && localTheme.colors.accent[500]
          ? localTheme.colors.accent[500]
          : '#d3e7c9';
      const rows = useMemo(() => buildBccTestRows(), [parameters]);
      if (rows.length === 0) {
        return (
          <Box p={4}>
            Please ensure that every characteristic with partitions has a base
            choice selected.
          </Box>
        );
      }
      const baseValues = rows[0].characteristicValues;
      return (
        <Box overflowX="auto">
          <Table border="1" cellSpacing="0" cellPadding="8">
            <Thead>
              <Tr>
                <Th style={headerStyle}>Test</Th>
                {rows[0].characteristicValues.map((_, index) => (
                  <Th key={index} style={headerStyle}>
                    Characteristic {String.fromCharCode(65 + index)}
                  </Th>
                ))}
                <Th style={headerStyle}>Oracle</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row) => (
                <Tr key={row.testName}>
                  <Td>{row.testName}</Td>
                  {row.characteristicValues.map((val, index) => (
                    <Td
                      key={index}
                      style={{
                        backgroundColor:
                          baseValues[index] === val
                            ? interactiveHighlightColor
                            : 'inherit',
                      }}
                    >
                      {val}
                    </Td>
                  ))}
                  <Td>
                    <OracleInput
                      testName={row.testName}
                      initialValue={oracleValuesRef.current[row.testName] || ''}
                      onBlur={(value) => updateOracleValue(row.testName, value)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      );
    },
  );

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
            label="Copy ISP Table"
            icon={<CopyIcon />}
            onClick={copyToMarkdown}
          />
          <ActionButton
            label="Preview ISP Table"
            icon={<ViewIcon />}
            onClick={previewISP}
          />
          <ActionButton
            label="Make Test Set"
            icon={<FaFlask />}
            onClick={previewBCC}
          />
          <ActionButton
            label="Copy Test Set"
            icon={<CopyIcon />}
            onClick={copyBccToMarkdown}
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
            {isBccPreview
              ? 'Base Choice Coverage Test Set'
              : 'Markdown Preview'}
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
