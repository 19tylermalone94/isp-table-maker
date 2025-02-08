import React, { useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast } from "@chakra-ui/react";

type Partition = { id: number; name: string; value: string };
type Characteristic = { id: number; name: string; partitions: Partition[] };
type Parameter = { id: number; name: string; characteristics: Characteristic[] };

const TableBuilder: React.FC = () => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const toast = useToast();

  // Update a specific parameter
  const updateParameter = (paramId: number, updatedParam: Parameter) => {
    setParameters(parameters.map(param => (param.id === paramId ? updatedParam : param)));
  };

  // Add a new Parameter
  const addParameter = () => {
    setParameters([...parameters, { id: Date.now(), name: "New Parameter", characteristics: [] }]);
  };

  // Delete a Parameter
  const deleteParameter = (paramId: number) => {
    setParameters(parameters.filter(param => param.id !== paramId));
  };

  // Delete a Characteristic
  const deleteCharacteristic = (paramId: number, charId: number) => {
    setParameters(
      parameters.map(param =>
        param.id === paramId
          ? { ...param, characteristics: param.characteristics.filter(char => char.id !== charId) }
          : param
      )
    );
  };

  // Delete a Partition
  const deletePartition = (paramId: number, charId: number, partId: number) => {
    setParameters(
      parameters.map(param =>
        param.id === paramId
          ? {
              ...param,
              characteristics: param.characteristics.map(char =>
                char.id === charId
                  ? { ...char, partitions: char.partitions.filter(part => part.id !== partId) }
                  : char
              ),
            }
          : param
      )
    );
  };

  // Generate markdown table with correct cell boundaries
  const copyToMarkdown = () => {
    let markdown = `| Variable | Characteristic | Partition | Value |\n`;
    markdown += `|----------|--------------|----------|-------|\n`;

    parameters.forEach(param => {
      if (param.characteristics.length === 0) {
        markdown += `| ${param.name} | - | - | - |\n`;
        return;
      }

      param.characteristics.forEach((char, charIndex) => {
        if (char.partitions.length === 0) {
          markdown += `| ${charIndex === 0 ? param.name : ""} | ${char.name} | - | - |\n`;
          return;
        }

        char.partitions.forEach((part, partIndex) => {
          markdown += `| ${charIndex === 0 && partIndex === 0 ? param.name : ""} | ${
            partIndex === 0 ? char.name : ""
          } | ${part.name} | ${part.value} |\n`;
        });
      });
    });

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied to clipboard",
      description: "Markdown table with borders copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} h="100vh" display="flex" flexDirection="column">
      <Button colorScheme="teal" onClick={addParameter} mb={3}>
        Add Parameter
      </Button>
      <Button colorScheme="blue" onClick={copyToMarkdown} mb={3}>
        Copy Markdown
      </Button>

      <Box flex="1" overflowY="auto" border="1px solid black" borderRadius="md">
        <Table variant="simple" size="lg">
          <Thead position="sticky" top="0" zIndex="1" bg="white" boxShadow="md">
            <Tr>
              <Th>Variable</Th>
              <Th>Characteristic</Th>
              <Th>Partition</Th>
              <Th>Value</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {parameters.map(param => (
              <React.Fragment key={param.id}>
                <Tr>
                  <Td>
                    <Input
                      value={param.name}
                      onChange={(e) => updateParameter(param.id, { ...param, name: e.target.value })}
                    />
                    <Button size="sm" onClick={() => updateParameter(param.id, {
                      ...param,
                      characteristics: [...param.characteristics, { id: Date.now(), name: "New Characteristic", partitions: [] }]
                    })} mt={2}>
                      Add Characteristic
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => deleteParameter(param.id)} mt={2} ml={2}>
                      Delete
                    </Button>
                  </Td>
                  <Td colSpan={4} textAlign="center" fontStyle="italic">
                    {param.characteristics.length === 0 ? "No characteristics added" : ""}
                  </Td>
                </Tr>
                {param.characteristics.map(char => (
                  <React.Fragment key={char.id}>
                    <Tr>
                      <Td></Td>
                      <Td>
                        <Input
                          value={char.name}
                          onChange={(e) =>
                            updateParameter(param.id, {
                              ...param,
                              characteristics: param.characteristics.map(c =>
                                c.id === char.id ? { ...c, name: e.target.value } : c
                              ),
                            })
                          }
                        />
                        <Button size="sm" onClick={() =>
                          updateParameter(param.id, {
                            ...param,
                            characteristics: param.characteristics.map(c =>
                              c.id === char.id ? {
                                ...c,
                                partitions: [...c.partitions, { id: Date.now(), name: "New Partition", value: "Example Value" }]
                              } : c
                            ),
                          })
                        } mt={2}>
                          Add Partition
                        </Button>
                        <Button size="sm" colorScheme="red" onClick={() => deleteCharacteristic(param.id, char.id)} mt={2} ml={2}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>

                    {char.partitions.map(partition => (
                      <Tr key={partition.id}>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                          <Input
                            value={partition.name}
                            onChange={(e) =>
                              updateParameter(param.id, {
                                ...param,
                                characteristics: param.characteristics.map(c =>
                                  c.id === char.id
                                    ? {
                                        ...c,
                                        partitions: c.partitions.map(p =>
                                          p.id === partition.id ? { ...p, name: e.target.value } : p
                                        ),
                                      }
                                    : c
                                ),
                              })
                            }
                          />
                        </Td>
                        <Td>
                          <Input
                            value={partition.value}
                            onChange={(e) =>
                              updateParameter(param.id, {
                                ...param,
                                characteristics: param.characteristics.map(c =>
                                  c.id === char.id
                                    ? {
                                        ...c,
                                        partitions: c.partitions.map(p =>
                                          p.id === partition.id ? { ...p, value: e.target.value } : p
                                        ),
                                      }
                                    : c
                                ),
                              })
                            }
                          />
                        </Td>
                        <Td>
                          <Button size="sm" colorScheme="red" onClick={() => deletePartition(param.id, char.id, partition.id)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableBuilder;
