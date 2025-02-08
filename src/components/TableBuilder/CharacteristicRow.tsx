import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import { Parameter } from "./ParameterRow";
import PartitionRow, { Partition } from "./PartitionRow";

export type Characteristic = { id: number; name: string; partitions: Partition[] };

type CharacteristicRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  updateParameter: (paramId: number, updatedParam: Parameter) => void;
  deleteCharacteristic: (paramId: number, charId: number) => void;
  deletePartition: (paramId: number, charId: number, partId: number) => void;
  isFirstCharacteristic: boolean;
  parameterRowSpan: number;
  addCharacteristic: () => void;
  deleteParameter: (paramId: number) => void;
};

const CharacteristicRow: React.FC<CharacteristicRowProps> = ({
  parameter,
  characteristic,
  updateParameter,
  deleteCharacteristic,
  deletePartition,
  isFirstCharacteristic,
  parameterRowSpan,
  addCharacteristic,
  deleteParameter,
}) => {
  const theme = useTheme();

  const addPartition = () => {
    const newPartition: Partition = {
      id: Date.now(),
      name: "",
      value: "",
    };

    const updatedChars = parameter.characteristics.map((c) =>
      c.id === characteristic.id
        ? { ...c, partitions: [...c.partitions, newPartition] }
        : c
    );
    updateParameter(parameter.id, { ...parameter, characteristics: updatedChars });
  };

  const rowCount = characteristic.partitions.length > 0 ? characteristic.partitions.length : 1;

  if (characteristic.partitions.length > 0) {
    const [firstPartition, ...otherPartitions] = characteristic.partitions;
    return (
      <>
        <Tr>
          {isFirstCharacteristic && (
            <Td rowSpan={parameterRowSpan} verticalAlign="middle">
              <Input
                color={theme.colors.text.primary}
                value={parameter.name}
                onChange={(e) =>
                  updateParameter(parameter.id, { ...parameter, name: e.target.value })
                }
              />
              <Button
                size="sm"
                bg={theme.colors.brand[500]}
                color={theme.colors.text.primary}
                _hover={{ bg: theme.colors.brand[600] }}
                onClick={addCharacteristic}
                mt={2}
              >
                Add Characteristic
              </Button>
              <Button
                size="sm"
                bg={theme.colors.delete[500]}
                color={theme.colors.text.primary}
                _hover={{ bg: theme.colors.delete[600] }}
                onClick={() => deleteParameter(parameter.id)}
                mt={2}
                ml={2}
              >
                Delete
              </Button>
            </Td>
          )}
          <Td rowSpan={rowCount} verticalAlign="middle">
            <Input
              color={theme.colors.text.primary}
              value={characteristic.name}
              onChange={(e) => {
                const updatedChars = parameter.characteristics.map((c) =>
                  c.id === characteristic.id ? { ...c, name: e.target.value } : c
                );
                updateParameter(parameter.id, { ...parameter, characteristics: updatedChars });
              }}
            />
            <Button
              size="sm"
              bg={theme.colors.brand[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.brand[600] }}
              onClick={addPartition}
              mt={2}
            >
              Add Partition
            </Button>
            <Button
              size="sm"
              bg={theme.colors.delete[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.delete[600] }}
              onClick={() => deleteCharacteristic(parameter.id, characteristic.id)}
              mt={2}
              ml={2}
            >
              Delete Characteristic
            </Button>
          </Td>
          <Td>
            <Input
              color={theme.colors.text.primary}
              value={firstPartition.name}
              onChange={(e) => {
                const updatedChars = parameter.characteristics.map((c) =>
                  c.id === characteristic.id
                    ? {
                        ...c,
                        partitions: c.partitions.map((p, idx) =>
                          idx === 0 ? { ...p, name: e.target.value } : p
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
              value={firstPartition.value}
              onChange={(e) => {
                const updatedChars = parameter.characteristics.map((c) =>
                  c.id === characteristic.id
                    ? {
                        ...c,
                        partitions: c.partitions.map((p, idx) =>
                          idx === 0 ? { ...p, value: e.target.value } : p
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
              onClick={() =>
                deletePartition(parameter.id, characteristic.id, firstPartition.id)
              }
            >
              Delete
            </Button>
          </Td>
        </Tr>
        {otherPartitions.map((part) => (
          <PartitionRow
            key={part.id}
            parameter={parameter}
            characteristic={characteristic}
            partition={part}
            updateParameter={updateParameter}
            deletePartition={deletePartition}
          />
        ))}
      </>
    );
  } else {
    return (
      <Tr>
        {isFirstCharacteristic && (
          <Td rowSpan={parameterRowSpan} verticalAlign="middle">
            <Input
              color={theme.colors.text.primary}
              value={parameter.name}
              onChange={(e) =>
                updateParameter(parameter.id, { ...parameter, name: e.target.value })
              }
            />
            <Button
              size="sm"
              bg={theme.colors.brand[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.brand[600] }}
              onClick={addCharacteristic}
              mt={2}
            >
              Add Characteristic
            </Button>
            <Button
              size="sm"
              bg={theme.colors.delete[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.delete[600] }}
              onClick={() => deleteParameter(parameter.id)}
              mt={2}
              ml={2}
            >
              Delete
            </Button>
          </Td>
        )}
        <Td>
          <Input
            color={theme.colors.text.primary}
            value={characteristic.name}
            onChange={(e) => {
              const updatedChars = parameter.characteristics.map((c) =>
                c.id === characteristic.id ? { ...c, name: e.target.value } : c
              );
              updateParameter(parameter.id, { ...parameter, characteristics: updatedChars });
            }}
          />
          <Button
            size="sm"
            bg={theme.colors.brand[500]}
            color={theme.colors.text.primary}
            _hover={{ bg: theme.colors.brand[600] }}
            onClick={addPartition}
            mt={2}
          >
            Add Partition
          </Button>
          <Button
            size="sm"
            bg={theme.colors.delete[500]}
            color={theme.colors.text.primary}
            _hover={{ bg: theme.colors.delete[600] }}
            onClick={() => deleteCharacteristic(parameter.id, characteristic.id)}
            mt={2}
            ml={2}
          >
            Delete Characteristic
          </Button>
        </Td>
        <Td>-</Td>
        <Td>-</Td>
        <Td>-</Td>
      </Tr>
    );
  }
};

export default CharacteristicRow;
