export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  /** UI language at submit time, used for subject formatting. */
  language: 'fr' | 'en';
}

export type ContactResult =
  | { ok: true; via: ContactProviderId }
  | { ok: false; via: ContactProviderId; error: string };

export type ContactProviderId = 'mailto' | 'formspree';

export interface ContactProvider {
  readonly id: ContactProviderId;
  /** Whether the provider sends asynchronously (false → opens external mail client). */
  readonly isAsync: boolean;
  send(submission: ContactSubmission): Promise<ContactResult>;
}

export const RECIPIENT_EMAIL = 'matthieumarin51@gmail.com';
