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
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    return { ok: true, via: 'mailto' };
  },
};
