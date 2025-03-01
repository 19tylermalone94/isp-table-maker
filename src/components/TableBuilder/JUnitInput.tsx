// src/components/TableBuilder/JUnitInput.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';

export interface JUnitInputProps {
  testName: string;
  initialValue: string;
  onBlur: (value: string) => void;
}

const JUnitInput: React.FC<JUnitInputProps> = React.memo(
  ({ initialValue, onBlur }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleBlur = () => {
      onBlur(value);
    };

    return (
      <Input
        placeholder="Enter JUnit test name"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

export default JUnitInput;
