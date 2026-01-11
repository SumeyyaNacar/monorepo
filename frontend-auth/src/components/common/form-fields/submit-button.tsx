"use client";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useFormStatus } from "react-dom";
import "./submit-button.scss";

type SubmitButtonProps = {
  title: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "submit" | "button";
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  icon,
  className = "submit-button",
  onClick,
  isLoading,
  type = "submit",
  ...rest
}) => {
  const { pending } = useFormStatus();
  const isActuallyLoading = pending || isLoading;

  return (
    <Button
      className={className}
      type={type}
      disabled={isActuallyLoading}
      onClick={onClick}
      {...rest}
    >
      {isActuallyLoading ? (
        <Spinner size="sm" />
      ) : (
        <>
          {icon && <i className={icon.startsWith("pi") ? icon : `pi pi-${icon}`}></i>}
          &nbsp;
          {title}
        </>
      )}
    </Button>
  );
};