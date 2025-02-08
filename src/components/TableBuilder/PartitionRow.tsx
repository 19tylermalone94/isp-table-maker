import React from "react";
import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import { Characteristic, Parameter, Partition } from "../../types/types";

type PartitionRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  partition: Partition;
  updatePartition: (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
    updated: Partial<Partition>
  ) => void;
  deletePartition: (parameterId: number, characteristicId: number, partitionId: number) => void;
};

const PartitionRow: React.FC<PartitionRowProps> = ({
  parameter,
  characteristic,
  partition,
  updatePartition,
  deletePartition,
}) => {
  const theme = useTheme();

  return (
    <Tr>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.name}
          onChange={(e) =>
            updatePartition(
              parameter.id,
              characteristic.id,
              partition.id,
              { name: e.target.value }
            )
          }
        />
      </Td>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.value}
          onChange={(e) =>
            updatePartition(
              parameter.id,
              characteristic.id,
              partition.id,
              { value: e.target.value }
            )
          }
        />
      </Td>
      <Td>
        <Button
          size="sm"
          bg={theme.colors.delete[500]}
          color={theme.colors.text.primary}
          _hover={{ bg: theme.colors.delete[600] }}
          onClick={() =>
            deletePartition(parameter.id, characteristic.id, partition.id)
          }
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default PartitionRow;
