import React from "react";
import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import PartitionRow from "./PartitionRow";
import { Parameter, Characteristic } from "../../types/types";

type CharacteristicRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  updateParameter: (id: number, updated: Partial<Parameter>) => void;
  deleteParameter: (id: number) => void;
  addCharacteristic: (parameterId: number) => void;
  updateCharacteristic: (
    parameterId: number,
    characteristicId: number,
    updated: Partial<Characteristic>
  ) => void;
  deleteCharacteristic: (parameterId: number, characteristicId: number) => void;
  addPartition: (parameterId: number, characteristicId: number) => void;
  updatePartition: (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
    updated: Partial<any>
  ) => void;
  deletePartition: (parameterId: number, characteristicId: number, partitionId: number) => void;
  isFirstCharacteristic: boolean;
  parameterRowSpan: number;
};

const CharacteristicRow: React.FC<CharacteristicRowProps> = ({
  parameter,
  characteristic,
  updateParameter,
  deleteParameter,
  addCharacteristic,
  updateCharacteristic,
  deleteCharacteristic,
  addPartition,
  updatePartition,
  deletePartition,
  isFirstCharacteristic,
  parameterRowSpan,
}) => {
  const theme = useTheme();

  const addPartitionHandler = () => {
    addPartition(parameter.id, characteristic.id);
  };

  const handleCharacteristicNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCharacteristic(parameter.id, characteristic.id, { name: e.target.value });
  };

  const handleParameterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParameter(parameter.id, { name: e.target.value });
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
                onChange={handleParameterNameChange}
              />
              <Button
                size="sm"
                bg={theme.colors.brand[500]}
                color={theme.colors.text.primary}
                _hover={{ bg: theme.colors.brand[600] }}
                onClick={() => addCharacteristic(parameter.id)}
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
              onChange={handleCharacteristicNameChange}
            />
            <Button
              size="sm"
              bg={theme.colors.brand[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.brand[600] }}
              onClick={addPartitionHandler}
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
              onChange={(e) =>
                updatePartition(
                  parameter.id,
                  characteristic.id,
                  firstPartition.id,
                  { name: e.target.value }
                )
              }
            />
          </Td>
          <Td>
            <Input
              color={theme.colors.text.primary}
              value={firstPartition.value}
              onChange={(e) =>
                updatePartition(
                  parameter.id,
                  characteristic.id,
                  firstPartition.id,
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
            updatePartition={updatePartition}
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
              onChange={handleParameterNameChange}
            />
            <Button
              size="sm"
              bg={theme.colors.brand[500]}
              color={theme.colors.text.primary}
              _hover={{ bg: theme.colors.brand[600] }}
              onClick={() => addCharacteristic(parameter.id)}
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
            onChange={handleCharacteristicNameChange}
          />
          <Button
            size="sm"
            bg={theme.colors.brand[500]}
            color={theme.colors.text.primary}
            _hover={{ bg: theme.colors.brand[600] }}
            onClick={addPartitionHandler}
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
