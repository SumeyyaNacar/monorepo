"use client";
import React from "react";
import { FormControl, FormFloating, FormGroup } from "react-bootstrap";
import "./text-input.scss";

type TextInputProps = {
  label: string;
  name: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  type?: string;
  required?: boolean;
   as?: 'input' | 'textarea';
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  defaultValue = "",
  onChange,
  error,
  className = "text-base",
  type = "text",
}) => {
  return (
    <FormGroup className={className}>
      <FormFloating>
        <FormControl
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
          isInvalid={!!error}
          size="lg"
        />
        <label htmlFor={name}>{label}</label>
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      </FormFloating>
    </FormGroup>
  );
};

export default TextInput;
