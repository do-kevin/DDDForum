import type { AnyFormApi } from "@tanstack/react-form";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export type UserRegistrationInput = User;

export type UserValidationResult = {
  success: boolean;
  errorMessage?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
  };
};

export type UserSubmissionObject = {
  value: User;
  formApi: AnyFormApi;
  signal: AbortSignal;
};
