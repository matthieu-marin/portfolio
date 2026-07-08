import type { ContactProvider } from './contactProvider';
import { MailtoProvider } from './providers/MailtoProvider';
import { createFormspreeProvider } from './providers/FormspreeProvider';

export type {
  ContactProvider,
  ContactSubmission,
  ContactResult,
  ContactProviderId,
} from './contactProvider';
export { RECIPIENT_EMAIL } from './contactProvider';

/**
 * Returns the active contact provider for this environment.
 *
 * Resolution order:
 *   1. `VITE_FORMSPREE_ID` env var → Formspree async POST
 *   2. fallback → Mailto (opens the user's mail client)
 *
 * Add a `.env.local` with `VITE_FORMSPREE_ID=xxxxx` to switch.
 */
export function getContactProvider(): ContactProvider {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  if (formspreeId && formspreeId.length > 0) {
    return createFormspreeProvider(formspreeId);
  }
  return MailtoProvider;
}
