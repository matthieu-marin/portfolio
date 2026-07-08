import type {
  ContactProvider,
  ContactResult,
  ContactSubmission,
} from '../contactProvider';
import { RECIPIENT_EMAIL } from '../contactProvider';

export const MailtoProvider: ContactProvider = {
  id: 'mailto',
  isAsync: false,
  async send(submission: ContactSubmission): Promise<ContactResult> {
    const subject = encodeURIComponent(
      submission.language === 'fr'
        ? `Contact portfolio — ${submission.name}`
        : `Portfolio contact — ${submission.name}`
    );
    const body = encodeURIComponent(
      `${submission.message}\n\n— ${submission.name} (${submission.email})`
    );
    // No reliable way to detect whether a mail client is registered. We
    // attempt the navigation and assume the OS will surface a fallback if
    // none responds. Caller should keep the form filled (we don't reset it).
    try {
      window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
      return { ok: true, via: 'mailto' };
    } catch (err) {
      return {
        ok: false,
        via: 'mailto',
        error: err instanceof Error ? err.message : 'mailto navigation failed',
      };
    }
  },
};
