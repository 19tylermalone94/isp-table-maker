import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import TableBuilder from "./components/TableBuilder/TableBuilder";
import { slateBlueTheme, darkTheme, cyberpunkTheme } from "./themes"; // Import themes

const themes = [slateBlueTheme, darkTheme, cyberpunkTheme];

export const App = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  const toggleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <ChakraProvider theme={themes[themeIndex]}>
      <Header toggleTheme={toggleTheme} />
      <TableBuilder />
    </ChakraProvider>
  );
};

export default App;
