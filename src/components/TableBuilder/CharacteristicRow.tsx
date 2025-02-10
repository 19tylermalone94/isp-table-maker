import React from 'react';
import { Tr, Td, Input, useTheme, HStack, Radio } from '@chakra-ui/react';
import PartitionRow from './PartitionRow';
import { Parameter, Characteristic, Partition } from '../../types/types';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import ActionButton from './ActionButton';

type CharacteristicRowProps = {
  parameter: Parameter;
  characteristic: Characteristic;
  updateParameter: (id: number, updated: Partial<Parameter>) => void;
  deleteParameter: (id: number) => void;
  addCharacteristic: (parameterId: number) => void;
  updateCharacteristic: (
    parameterId: number,
    characteristicId: number,
    updated: Partial<Characteristic>,
  ) => void;
  deleteCharacteristic: (parameterId: number, characteristicId: number) => void;
  addPartition: (parameterId: number, characteristicId: number) => void;
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

  const handleCharacteristicNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateCharacteristic(parameter.id, characteristic.id, {
      name: e.target.value,
    });
  };

  const handleParameterNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateParameter(parameter.id, { name: e.target.value });
  };

  const rowCount =
    characteristic.partitions.length > 0 ? characteristic.partitions.length : 1;

  if (characteristic.partitions.length > 0) {
    const [firstPartition, ...otherPartitions] = characteristic.partitions;
    return (
      <>
        <Tr>
          {isFirstCharacteristic && (
            <Td rowSpan={parameterRowSpan} verticalAlign="middle">
              <HStack>
                <Input
                  color={theme.colors.text.primary}
                  value={parameter.name}
                  onChange={handleParameterNameChange}
                />
                <ActionButton
                  label="Add Characteristic"
                  icon={<AddIcon />}
                  onClick={() => addCharacteristic(parameter.id)}
                />
                <ActionButton
                  label="Delete Parameter"
                  icon={<CloseIcon />}
                  onClick={() => deleteParameter(parameter.id)}
                  variant="delete"
                />
              </HStack>
            </Td>
          )}
          <Td rowSpan={rowCount} verticalAlign="middle">
            <HStack>
              <Input
                color={theme.colors.text.primary}
                value={characteristic.name}
                onChange={handleCharacteristicNameChange}
              />
              <ActionButton
                label="Add Partition"
                icon={<AddIcon />}
                onClick={addPartitionHandler}
              />
              <ActionButton
                label="Delete Characteristic"
                icon={<CloseIcon />}
                onClick={() =>
                  deleteCharacteristic(parameter.id, characteristic.id)
                }
                variant="delete"
              />
            </HStack>
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
                  { name: e.target.value },
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
                  { value: e.target.value },
                )
              }
            />
          </Td>
          <Td>
            <Radio
              name={`base-choice-${characteristic.id}`}
              isChecked={firstPartition.id === characteristic.basePartitionId}
              onChange={() =>
                updateCharacteristic(parameter.id, characteristic.id, {
                  basePartitionId: firstPartition.id,
                })
              }
              colorScheme="accent"
              borderColor="brand.500"
            />
          </Td>
          <Td>
            <ActionButton
              label="Delete Partition"
              icon={<CloseIcon />}
              onClick={() =>
                deletePartition(
                  parameter.id,
                  characteristic.id,
                  firstPartition.id,
                )
              }
              variant="delete"
            />
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
            setBaseChoice={() =>
              updateCharacteristic(parameter.id, characteristic.id, {
                basePartitionId: part.id,
              })
            }
            isBase={part.id === characteristic.basePartitionId}
          />
        ))}
      </>
    );
  } else {
    return (
      <Tr>
        {isFirstCharacteristic && (
          <Td rowSpan={parameterRowSpan} verticalAlign="middle">
            <HStack>
              <Input
                color={theme.colors.text.primary}
                value={parameter.name}
                onChange={handleParameterNameChange}
              />
              <ActionButton
                label="Add Characteristic"
                icon={<AddIcon />}
                onClick={() => addCharacteristic(parameter.id)}
              />
              <ActionButton
                label="Delete Parameter"
                icon={<CloseIcon />}
                onClick={() => deleteParameter(parameter.id)}
                variant="delete"
              />
            </HStack>
          </Td>
        )}
        <Td>
          <HStack>
            <Input
              color={theme.colors.text.primary}
              value={characteristic.name}
              onChange={handleCharacteristicNameChange}
            />
            <ActionButton
              label="Add Partition"
              icon={<AddIcon />}
              onClick={addPartitionHandler}
            />
            <ActionButton
              label="Delete Characteristic"
              icon={<CloseIcon />}
              onClick={() =>
                deleteCharacteristic(parameter.id, characteristic.id)
              }
              variant="delete"
            />
          </HStack>
        </Td>
        <Td>-</Td>
        <Td>-</Td>
        <Td>-</Td>
        <Td>-</Td>
      </Tr>
    );
  }
};

export default CharacteristicRow;
