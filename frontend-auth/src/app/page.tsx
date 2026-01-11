"use client";

import { useState } from "react";
import LoginComponent from "@/components/login/login-component";
import RegisterComponent from "@/components/register/register-component";
import { SubmitButton } from "@/components/common/form-fields/submit-button";
import { Container } from "react-bootstrap";

export default function Home() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const togglePanel = (val: boolean) => setRightPanelActive(val);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className={`glass-container ${rightPanelActive ? "right-panel-active" : ""}`}>
        
        {/* Sign Up Formu */}
        <div className="form-container sign-up">
          <RegisterComponent setShowLogin={() => togglePanel(false)} />
          {/* Mobil için switch */}
          <div className="mobile-switch">
            Already have an account? <span onClick={() => togglePanel(false)}>Sign In</span>
          </div>
        </div>

        {/* Sign In Formu */}
        <div className="form-container sign-in">
          <LoginComponent setShowLogin={() => togglePanel(true)} />
          {/* Mobil için switch */}
          <div className="mobile-switch">
            Don't have an account? <span onClick={() => togglePanel(true)}>Sign Up</span>
          </div>
        </div>

        {/* Hareket Eden Overlay (Sadece Desktop) */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="fw-bold">Welcome Back!</h1>
              <p className="my-4">To keep connected with us please login with your personal info</p>
              <SubmitButton
                type="button"
                title="SIGN IN" 
                className="overlay-button"
                onClick={() => togglePanel(false)}
              />
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="fw-bold">Hello, Friend!</h1>
              <p className="my-4">Enter your personal details and start your journey with us</p>
              <SubmitButton
                type="button"
                title="SIGN UP"
                className="overlay-button"
                onClick={() => togglePanel(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}