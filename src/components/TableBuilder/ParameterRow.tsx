import React from "react";
import { Tr, Td, Input, Button, useTheme, HStack } from "@chakra-ui/react";
import CharacteristicRow from "./CharacteristicRow";
import { Parameter } from "../../types/types";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import ActionButton from "./ActionButton";

type ParameterRowProps = {
  parameter: Parameter;
  updateParameter: (id: number, updated: Partial<Parameter>) => void;
  deleteParameter: (id: number) => void;
  addCharacteristic: (parameterId: number) => void;
  updateCharacteristic: (
    parameterId: number,
    characteristicId: number,
    updated: Partial<any>
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
};

const ParameterRow: React.FC<ParameterRowProps> = ({
  parameter,
  updateParameter,
  deleteParameter,
  addCharacteristic,
  updateCharacteristic,
  deleteCharacteristic,
  addPartition,
  updatePartition,
  deletePartition,
}) => {
  const theme = useTheme();

  const getParameterRowCount = (param: Parameter) => {
    if (param.characteristics.length === 0) return 1;
    return param.characteristics.reduce((sum, char) => {
      return sum + (char.partitions.length > 0 ? char.partitions.length : 1);
    }, 0);
  };

  const totalRows = getParameterRowCount(parameter);

  if (parameter.characteristics.length === 0) {
    return (
      <Tr>
        <Td rowSpan={1} verticalAlign="middle">
          <HStack>
            <Input
              color={theme.colors.text.primary}
              value={parameter.name}
              onChange={(e) => updateParameter(parameter.id, { name: e.target.value })}
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
        <Td colSpan={3} textAlign="center" color={theme.colors.text.primary}>
          No characteristics added
        </Td>
      </Tr>
    );
  }

  return (
    <>
      {parameter.characteristics.map((char, index) => (
        <CharacteristicRow
          key={char.id}
          parameter={parameter}
          characteristic={char}
          updateParameter={updateParameter}
          deleteParameter={deleteParameter}
          addCharacteristic={addCharacteristic}
          updateCharacteristic={updateCharacteristic}
          deleteCharacteristic={deleteCharacteristic}
          addPartition={addPartition}
          updatePartition={updatePartition}
          deletePartition={deletePartition}
          isFirstCharacteristic={index === 0}
          parameterRowSpan={totalRows}
        />
      ))}
    </>
  );
};

export default ParameterRow;
