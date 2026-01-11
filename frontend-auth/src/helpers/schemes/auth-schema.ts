import * as Yup from "yup";

/**
 * 🔑 LoginSchema ile tam uyumlu
 */
export const AuthSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

/**
 * 📝 User Model & SignupSchema ile tam uyumlu
 */
export const RegisterSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required"),
    
  lastName: Yup.string()
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters.")
    .matches(/[0-9]/, "Password must include at least one number.")
    .matches(/[a-z]/, "Password must include at least one lowercase letter.")
    .required("Password is required"),
});