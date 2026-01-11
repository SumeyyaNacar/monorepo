import { auth } from "@/auth";
import { SubmitButton } from "@/components/common/form-fields/submit-button";
import { logoutAction } from "@/actions/auth-action"; // Adjust the import path as needed
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <>
      <h1 className="fw-bold mb-4">
        Welcome to Dashboard, {session?.user?.name}
      </h1>

      <p className="lead mb-5">You are successfully logged in.</p>

      <form action={logoutAction}>
        <SubmitButton
          title="Logout"
          icon="pi pi-sign-out"
          className="submit-button bg-danger border-0"
        />
      </form>
    </>
  );
};

export default DashboardPage;
