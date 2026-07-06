import { useRef } from 'react';
import { toast } from 'sonner';
import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { useEditContext } from '../../shared/contexts/EditContext';
import { ContactRecruiter } from './recruiter/ContactRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildContactHttp, CONTACT_PLACEHOLDERS } from './code/contactHttp';
import { getContactProvider } from '../contact';

export function Contact() {
  const { enabled } = useRenderer();
  const { t, language } = useLanguage();
  const { edits } = useEditContext();
  const sendingRef = useRef(false);

  const handleSend = async () => {
    if (sendingRef.current) return;
    sendingRef.current = true;

    try {
      const fallback = CONTACT_PLACEHOLDERS[language];
      const email = edits['contact.form.email'] ?? fallback.email;
      const name = edits['contact.form.name'] ?? fallback.name;
      const message = edits['contact.form.message'] ?? fallback.message;

      const provider = getContactProvider();
      const result = await provider.send({ name, email, message, language });
      if (result.ok) {
        if (provider.isAsync) {
          toast.success(t('contact.toast.sent'), {
            description: t('contact.toast.sentDescription'),
          });
        }
        // Mailto opens the client — no toast needed.
      } else {
        toast.error(t('contact.toast.failed'), {
          description: result.error,
        });
      }
    } finally {
      sendingRef.current = false;
    }
  };

  return enabled ? (
    <ContactRecruiter />
  ) : (
    <CodeFileView
      model={buildContactHttp(language)}
      action={{ label: 'Send Request', beforeLine: 3, onClick: handleSend }}
    />
  );
}
