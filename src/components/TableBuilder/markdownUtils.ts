import { WithCSSVar } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import { Parameter } from '../../types/types';
import { BccTestRow } from './bccHelpers';

export const generateMarkdownPreview = (
  parameters: Parameter[],
  theme: WithCSSVar<Dict>,
): string => {
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
      const charRows = char.partitions.length > 0 ? char.partitions.length : 1;
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
            partitionCellStyle = ` style="background-color: ${accentColor}; padding-left: 0.5em;"`;
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

export const generateMarkdownCopy = (
  parameters: Parameter[],
  fixedGreen = '#d3e7c9',
): string => {
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
      const charRows = char.partitions.length > 0 ? char.partitions.length : 1;
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

export const generateBccMarkdownWithOracle = (
  parameters: Parameter[],
  oracleValues: Record<string, string>,
  buildBccTestRowsFn: (parameters: Parameter[]) => BccTestRow[],
): string => {
  const rows = buildBccTestRowsFn(parameters);
  if (rows.length === 0) return '';
  const baseValues = rows[0].characteristicValues;
  let html = `<h3>Base Choice Coverage</h3>`;
  html += `<table border="1" cellspacing="0" cellpadding="8">
  <thead>
    <tr>
      <th>Test</th>`;
  rows[0].characteristicValues.forEach((_: string, index: number) => {
    html += `<th>Characteristic ${String.fromCharCode(65 + index)}</th>`;
  });
  html += `<th>Oracle</th></tr></thead><tbody>`;
  rows.forEach((row: BccTestRow) => {
    html += `<tr>`;
    html += `<td>${row.testName}</td>`;
    row.characteristicValues.forEach((val: string, index: number) => {
      const bgColor = baseValues[index] === val ? '#d3e7c9' : 'transparent';
      html += `<td style="background-color: ${bgColor};">${val}</td>`;
    });
    const oracle = oracleValues[row.testName] || 'expected value/behavior';
    html += `<td>${oracle}</td>`;
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
};
