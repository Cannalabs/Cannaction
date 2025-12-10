// src/components/customSelect/CustomSelect.tsx
import React from 'react';
import { Select, MenuItem } from '@mui/material';

interface CustomSelectProps {
  labelId: string;
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  labelId,
  id,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Select
      size="small"
      labelId={labelId}
      id={id}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      style={{ fontSize: '0.8rem' }}
      sx={{
        '& fieldset': { height: '40px' },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          style={{ fontSize: '0.8rem' }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
