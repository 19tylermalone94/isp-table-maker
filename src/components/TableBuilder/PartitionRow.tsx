import React from 'react';
import { Tr, Td, Input, useTheme } from '@chakra-ui/react';
import { Characteristic, Parameter, Partition } from '../../types/types';
import { CloseIcon } from '@chakra-ui/icons';
import ActionButton from './ActionButton';

type PartitionRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  partition: Partition;
  updatePartition: (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
    updated: Partial<Partition>,
  ) => void;
  deletePartition: (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
  ) => void;
  setBaseChoice?: () => void;
  isBase?: boolean;
};

const PartitionRow: React.FC<PartitionRowProps> = ({
  parameter,
  characteristic,
  partition,
  updatePartition,
  deletePartition,
  setBaseChoice,
  isBase = false,
}) => {
  const theme = useTheme();

  return (
    <Tr>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.name}
          onChange={(e) =>
            updatePartition(parameter.id, characteristic.id, partition.id, {
              name: e.target.value,
            })
          }
        />
      </Td>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.value}
          onChange={(e) =>
            updatePartition(parameter.id, characteristic.id, partition.id, {
              value: e.target.value,
            })
          }
        />
      </Td>
      <Td>
        <input
          type="radio"
          name={`base-choice-${characteristic.id}`}
          checked={isBase}
          onChange={setBaseChoice}
        />
      </Td>
      <Td>
        <ActionButton
          label="Delete Partition"
          icon={<CloseIcon />}
          onClick={() =>
            deletePartition(parameter.id, characteristic.id, partition.id)
          }
          variant="delete"
        />
      </Td>
    </Tr>
  );
};

export default PartitionRow;
