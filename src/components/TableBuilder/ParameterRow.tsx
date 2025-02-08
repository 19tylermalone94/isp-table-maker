import React from "react";
import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import CharacteristicRow from "./CharacteristicRow";
import { Parameter } from "../../types/types";

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
          <Input
            color={theme.colors.text.primary}
            value={parameter.name}
            onChange={(e) => updateParameter(parameter.id, { name: e.target.value })}
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
            ml={2}
          >
            Delete
          </Button>
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
