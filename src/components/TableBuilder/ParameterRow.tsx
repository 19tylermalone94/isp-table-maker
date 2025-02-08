import { Tr, Td, Input, Button, useTheme } from "@chakra-ui/react";
import CharacteristicRow, { Characteristic } from "./CharacteristicRow";

export type Parameter = { id: number; name: string; characteristics: Characteristic[] };

type ParameterRowProps = {
  parameter: Parameter;
  updateParameter: (paramId: number, updatedParam: Parameter) => void;
  deleteParameter: (paramId: number) => void;
  deleteCharacteristic: (paramId: number, charId: number) => void;
  deletePartition: (paramId: number, charId: number, partId: number) => void;
};

const ParameterRow: React.FC<ParameterRowProps> = ({
  parameter,
  updateParameter,
  deleteParameter,
  deleteCharacteristic,
  deletePartition,
}) => {
  const theme = useTheme();

  const addCharacteristic = () => {
    const newCharacteristic: Characteristic = {
      id: Date.now(),
      name: "",
      partitions: [],
    };
    updateParameter(parameter.id, {
      ...parameter,
      characteristics: [...parameter.characteristics, newCharacteristic],
    });
  };

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
          deleteCharacteristic={deleteCharacteristic}
          deletePartition={deletePartition}
          isFirstCharacteristic={index === 0}
          parameterRowSpan={totalRows}
          addCharacteristic={addCharacteristic}
          deleteParameter={deleteParameter}
        />
      ))}
    </>
  );
};

export default ParameterRow;
