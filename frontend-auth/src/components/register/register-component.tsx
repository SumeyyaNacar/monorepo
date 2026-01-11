"use client";

import { registerAction } from "@/actions/auth-action";
import { initialState } from "@/helpers/form-validation";
import React, { useActionState, useEffect } from "react";
import { Form, Alert, Row, Col } from "react-bootstrap";
import TextInput from "../common/form-fields/text-input";
import PasswordInput from "../common/form-fields/password-input";
import { SubmitButton } from "../common/form-fields/submit-button";

interface RegisterComponentProps {
  setShowLogin: (val: boolean) => void;
}

const RegisterComponent = ({ setShowLogin }: RegisterComponentProps) => {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state?.ok) {
      // Kayıt başarılıysa 3 saniye sonra paneli Login tarafına kaydırır
      const timer = setTimeout(() => {
        setShowLogin(true); // Parent'taki setRightPanelActive(false) fonksiyonunu tetikler
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state?.ok, setShowLogin]);

  return (
    <Form action={formAction} className="w-100" noValidate>
      <div className="text-center mb-4">
        <h3 className="fw-bold">CREATE ACCOUNT</h3>
        <h6 className="opacity-75">Fill in the details to join us</h6>
      </div>

      {state?.ok && state?.message && (
        <Alert variant="success" className="mb-3 py-2 small border-0 bg-success text-white">
          <i className="pi pi-check-circle me-2"></i>
          {state.message} - Sliding to login...
        </Alert>
      )}

      {!state?.ok && state?.message && (
        <Alert variant="danger" className="mb-3 py-2 small border-0 bg-danger text-white">
          <i className="pi pi-exclamation-circle me-2"></i>
          {state.message}
        </Alert>
      )}

      <fieldset disabled={isPending || state?.ok}>
        <Row>
          <Col md={6}>
            <TextInput
              label="First Name"
              name="firstName"
              defaultValue={(state?.data?.firstName as string) || ""}
              error={state?.errors?.firstName}
            />
          </Col>
          <Col md={6}>
            <TextInput
              label="Last Name"
              name="lastName"
              defaultValue={(state?.data?.lastName as string) || ""}
              error={state?.errors?.lastName}
            />
          </Col>
        </Row>

        <TextInput
          label="Email Address"
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
            title="Register" 
            icon="pi pi-user-plus" 
            isLoading={isPending}
          />
        </div>
      </fieldset>
    </Form>
  );
};

export default RegisterComponent;