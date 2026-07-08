import type {
  ContactProvider,
  ContactResult,
  ContactSubmission,
} from '../contactProvider';

export function createFormspreeProvider(formId: string): ContactProvider {
  const endpoint = `https://formspree.io/f/${formId}`;
  return {
    id: 'formspree',
    isAsync: true,
    async send(submission: ContactSubmission): Promise<ContactResult> {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: submission.name,
            email: submission.email,
            message: submission.message,
            _subject:
              submission.language === 'fr'
                ? `Contact portfolio — ${submission.name}`
                : `Portfolio contact — ${submission.name}`,
          }),
        });

        if (res.ok) return { ok: true, via: 'formspree' };

        const data = (await res.json().catch(() => ({}))) as { error?: string };
        return {
          ok: false,
          via: 'formspree',
          error: data.error ?? `HTTP ${res.status}`,
        };
      } catch (err) {
        return {
          ok: false,
          via: 'formspree',
          error: err instanceof Error ? err.message : 'Network error',
        };
      }
    },
  };
}
