// src/components/TableBuilder/BccTableInteractive.tsx
import React, { useMemo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useTheme,
} from '@chakra-ui/react';
import OracleInput from './OracleInput';
import JUnitInput from './JUnitInput'; // import the new component
import { BccTestRow, Parameter } from '../../types/types';
import { buildBccTestRows } from './bccHelpers';

interface BccTableInteractiveProps {
  parameters: Parameter[];
  oracleValues: Record<string, string>;
  updateOracleValue: (testName: string, value: string) => void;
  unitTestNames: Record<string, string>;
  updateUnitTestName: (testName: string, value: string) => void;
}

const BccTableInteractive: React.FC<BccTableInteractiveProps> = ({
  parameters,
  oracleValues,
  updateOracleValue,
  unitTestNames,
  updateUnitTestName,
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
    (localTheme.colors.accent && localTheme.colors.accent[500]) || '#d3e7c9';

  const rows: BccTestRow[] = useMemo(
    () => buildBccTestRows(parameters),
    [parameters],
  );
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
            {parameters
              .flatMap((p) => p.characteristics)
              .map((char, index) => (
                <Th key={index} style={headerStyle}>
                  {parameters.find((p) => p.characteristics.includes(char))
                    ?.name +
                    ' ' +
                    char.name}
                </Th>
              ))}
            <Th style={headerStyle}>Oracle</Th>
            <Th style={headerStyle}>JUnit Test Name</Th> {/* New header */}
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
                  initialValue={oracleValues[row.testName] || ''}
                  onBlur={(value) => updateOracleValue(row.testName, value)}
                />
              </Td>
              <Td>
                <JUnitInput
                  testName={row.testName}
                  initialValue={unitTestNames[row.testName] || ''}
                  onBlur={(value) => updateUnitTestName(row.testName, value)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default React.memo(BccTableInteractive);
