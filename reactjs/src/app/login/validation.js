// src/utils/validation.js

const SIGN_UP_FIELDS = ['email', 'password', 'confirmPassword', 'username', 'phone', 'fullName'];
const SIGN_IN_FIELDS = ['email', 'password'];

export const validateInputs = (isSignIn, values) => {
  const requiredFields = isSignIn ? SIGN_IN_FIELDS : SIGN_UP_FIELDS;
  const errors = {};

  // Check for empty fields
  requiredFields.forEach(field => {
    if (!values[field] || values[field].toString().trim() === '') {
      errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required.`;
    }
  });

  // Additional validation for sign-up
  if (!isSignIn) {
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (values.password && values.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    if (values.phone && !/^\+?\d{10,15}$/.test(values.phone)) {
      errors.phone = "Invalid phone number.";
    }
  }

  return errors;
};