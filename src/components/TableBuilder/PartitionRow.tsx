import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import { Characteristic } from "./CharacteristicRow";
import { Parameter } from "./ParameterRow";

export type Partition = { id: number; name: string; value: string };

type PartitionRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  partition: Partition;
  updateParameter: (paramId: number, updatedParam: Parameter) => void;
  deletePartition: (paramId: number, charId: number, partId: number) => void;
};

const PartitionRow: React.FC<PartitionRowProps> = ({
  parameter,
  characteristic,
  partition,
  updateParameter,
  deletePartition,
}) => {
  const theme = useTheme();
  
  return (
    <Tr>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.name}
          onChange={(e) => {
            const updatedChars = parameter.characteristics.map((c) =>
              c.id === characteristic.id
                ? {
                    ...c,
                    partitions: c.partitions.map((p) =>
                      p.id === partition.id ? { ...p, name: e.target.value } : p
                    ),
                  }
                : c
            );
            updateParameter(parameter.id, { ...parameter, characteristics: updatedChars });
          }}
        />
      </Td>
      <Td>
        <Input
          color={theme.colors.text.primary}
          value={partition.value}
          onChange={(e) => {
            const updatedChars = parameter.characteristics.map((c) =>
              c.id === characteristic.id
                ? {
                    ...c,
                    partitions: c.partitions.map((p) =>
                      p.id === partition.id ? { ...p, value: e.target.value } : p
                    ),
                  }
                : c
            );
            updateParameter(parameter.id, { ...parameter, characteristics: updatedChars });
          }}
        />
      </Td>
      <Td>
        <Button
          size="sm"
          bg={theme.colors.delete[500]}
          color={theme.colors.text.primary}
          _hover={{ bg: theme.colors.delete[600] }}
          onClick={() => deletePartition(parameter.id, characteristic.id, partition.id)}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default PartitionRow;
