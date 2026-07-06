import { toast } from 'sonner';
import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { useEditContext } from '../../shared/contexts/EditContext';
import { ContactRecruiter } from './recruiter/ContactRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildContactHttp } from './code/contactHttp';
import { getContactProvider } from '../contact';

// Fallback placeholders — mirror code/contactHttp.ts's PLACEHOLDERS, used
// when the recruiter/visitor hasn't edited a field via ed() in code view.
const FALLBACKS: Record<'fr' | 'en', { email: string; name: string; message: string }> = {
  fr: {
    email: 'votre.email@exemple.com',
    name: 'Votre nom',
    message: 'Bonjour Matthieu, je vous contacte au sujet de…',
  },
  en: {
    email: 'your.email@example.com',
    name: 'Your name',
    message: 'Hi Matthieu, reaching out about…',
  },
};

export function Contact() {
  const { enabled } = useRenderer();
  const { t, language } = useLanguage();
  const { edits } = useEditContext();

  const handleSend = async () => {
    const fallback = FALLBACKS[language];
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
