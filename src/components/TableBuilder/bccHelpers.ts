import { Parameter, Partition, Characteristic } from '../../types/types';

export interface BccTestRow {
  testName: string;
  characteristicValues: string[];
}

export const buildBccTestRows = (parameters: Parameter[]): BccTestRow[] => {
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
      const basePart: Partition | undefined = gc.characteristic.partitions.find(
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
