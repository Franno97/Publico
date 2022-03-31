
export interface PersonRegistrationOutput {
  success: boolean;
  error?: string;
}

export interface PreCheckInput {
  registerNumber: string;
  birthDate: string;
}

export interface ValidateVerificationCodeInput {
  registerNumber: string;
  verficationCode: string;
}
