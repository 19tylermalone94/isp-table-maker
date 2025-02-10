// src/components/TableBuilder/OracleInput.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';

export interface OracleInputProps {
  testName: string;
  initialValue: string;
  onBlur: (value: string) => void;
}

const OracleInput: React.FC<OracleInputProps> = React.memo(
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
        placeholder="Enter expected value/behavior"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

export default OracleInput;
