"use client";

import { loginAction } from "@/actions/auth-action";
import { initialState } from "@/helpers/form-validation";
import React, { useActionState } from "react";
import { Form, Alert } from "react-bootstrap";
import TextInput from "../common/form-fields/text-input";
import PasswordInput from "../common/form-fields/password-input";
import { SubmitButton } from "../common/form-fields/submit-button";

interface LoginComponentProps {
  setShowLogin: (val: boolean) => void;
}

const LoginComponent = ({ setShowLogin }: LoginComponentProps) => {

  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <Form action={formAction} className="login-form w-100" noValidate>
      <div className="text-center mb-4">
        <h3 className="fw-bold">LOGIN</h3>
        <h6 className="opacity-75">Please enter your email and password</h6>
      </div>

      {!state?.ok && state?.message && (
        <Alert variant="danger" className="mb-3 py-2 small border-0 bg-danger text-white">
          <i className="pi pi-exclamation-triangle me-2"></i>
          {state.message}
        </Alert>
      )}

      <fieldset disabled={isPending}>
        <TextInput
          label="Email"
          name="email"
          type="email"
          defaultValue={(state?.data?.email as string) || ""}
          error={state?.errors?.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          defaultValue={(state?.data?.password as string) || ""}
          error={state?.errors?.password}
        />

        <div className="d-grid mt-4">
          <SubmitButton 
            title="Sign In" 
            icon="pi pi-sign-in" 
            isLoading={isPending} 
          />
        </div>
      </fieldset>
    </Form>
  );
};

export default LoginComponent;