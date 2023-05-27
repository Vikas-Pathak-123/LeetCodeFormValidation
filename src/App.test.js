import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RegistrationForm from "./components/RegistrationForm";

test("1. displays validation error messages for invalid form submission", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.click(registerButton);
  expect(screen.getByText("Name is required")).toBeInTheDocument();
  expect(screen.getByText("Email is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
  expect(screen.getByText("Confirm Password is required")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Jo" } });
  fireEvent.change(screen.getByLabelText("Email:"), {
    target: { value: "invalid-email" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "pass" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "password" },
  });
  fireEvent.click(registerButton);

  expect(
    screen.getByText("Name must be at least 3 characters long")
  ).toBeInTheDocument();
  expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  expect(
    screen.getByText("Password must be at least 8 characters long")
  ).toBeInTheDocument();
  expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
});

test("2. does not display validation error messages for valid form submission", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.change(screen.getByLabelText("Name:"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email:"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "password" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "password" },
  });
  fireEvent.click(registerButton);

  expect(screen.queryByText("Name is required")).toBeNull();
  expect(screen.queryByText("Email is required")).toBeNull();
  expect(screen.queryByText("Password is required")).toBeNull();
  expect(screen.queryByText("Confirm Password is required")).toBeNull();
});

// Additional test cases

test("3. displays error message for empty name input", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.click(registerButton);

  expect(screen.getByText("Name is required")).toBeInTheDocument();
});

test("4.displays error message for empty email input", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.click(registerButton);

  expect(screen.getByText("Email is required")).toBeInTheDocument();
});

test("5. displays error message for empty password input", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.click(registerButton);

  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("6. displays error message for empty confirm password input", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.click(registerButton);

  expect(screen.getByText("Confirm Password is required")).toBeInTheDocument();
});

test("7. does not display any error messages for valid form submission", () => {
  render(<RegistrationForm />);
  const registerButton = screen.getByText("Register");

  fireEvent.change(screen.getByLabelText("Name:"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email:"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "password" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "password" },
  });
  fireEvent.click(registerButton);

  expect(screen.queryByText("Name is required")).toBeNull();
  expect(screen.queryByText("Email is required")).toBeNull();
  expect(screen.queryByText("Password is required")).toBeNull();
  expect(screen.queryByText("Confirm Password is required")).toBeNull();
});
 