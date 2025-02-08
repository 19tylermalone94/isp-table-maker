import { ChakraProvider, theme } from "@chakra-ui/react";
import TableBuilder from "./components/TableBuilder"


export const App = () => (
  <ChakraProvider theme={theme}>
    <TableBuilder />
  </ChakraProvider>
)
