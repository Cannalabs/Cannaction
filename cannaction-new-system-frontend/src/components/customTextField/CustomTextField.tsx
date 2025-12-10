// src/components/CustomTextField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
  id: string;
  label: string;
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  variant = 'outlined',
  fullWidth = false,
  value,
  onChange,
}) => {
  return (
    <TextField
      size="small"
      id={id}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CustomTextField;
