"use client";
import React, { useState } from "react";
import { FloatingLabel, FormControl, FormGroup } from "react-bootstrap";
import "./password-input.scss";

type PasswordInputProps = {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string;
  className?: string;
  required?: boolean;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  defaultValue = "",
  error,
  className = "password-base",
  required,
}) => {
  const [type, setType] = useState<"text" | "password">("password");

  return (
    <FormGroup className={className} style={{ position: "relative" }}>
      <FloatingLabel label={label}>
        <FormControl
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          isInvalid={!!error}
          size="lg"
          required={required}
        />
        <label htmlFor={name}>{label}</label>
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        <span
          onClick={() =>
            setType((prev) => (prev === "password" ? "text" : "password"))
          }
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          {type === "password" ? (
            <i className="pi pi-eye-slash" />
          ) : (
            <i className="pi pi-eye" />
          )}
        </span>
      </FloatingLabel>
    </FormGroup>
  );
};

export default PasswordInput;
