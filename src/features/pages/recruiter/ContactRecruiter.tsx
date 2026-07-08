import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../../../i18n/hooks';
import { getContactProvider } from '../../contact';
import { contact } from '../data';
import { RecruiterShell, Section } from './primitives';

// Social link presentation (icon) keyed by label — ContactData.socials only
// holds { label, url }, same convention as Contact.tsx.
const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
};

export function ContactRecruiter() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const provider = useMemo(() => getContactProvider(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await provider.send({ ...formData, language });
      if (result.ok) {
        if (provider.isAsync) {
          toast.success(t('contact.toast.sent'), {
            description: t('contact.toast.sentDescription'),
          });
          setFormData({ name: '', email: '', message: '' });
        }
        // Mailto opens the client — no toast needed.
      } else {
        toast.error(t('contact.toast.failed'), {
          description: result.error,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const social = contact.socials.map((s) => ({
    icon: SOCIAL_ICONS[s.label] ?? Linkedin,
    label: s.label,
    href: s.url,
  }));

  return (
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {t('recruiter.contact.title')}
      </h1>

      <Section icon={Mail} title={t('recruiter.contact.coordinatesTitle')} index={0}>
        <div className="space-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2.5 hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
            {contact.email}
          </a>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2.5 hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
            {contact.phone}
          </a>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
            {contact.location[language]}
          </div>
          {social.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background hover:bg-hover border border-border transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {s.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      <Section icon={Send} title={t('recruiter.contact.formTitle')} index={1}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="recruiter-name" className="block text-sm font-medium text-foreground/80">
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="recruiter-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm md:text-base"
              placeholder={t('contact.placeholder.name')}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="recruiter-email" className="block text-sm font-medium text-foreground/80">
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="recruiter-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm md:text-base"
              placeholder={t('contact.placeholder.email')}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="recruiter-message" className="block text-sm font-medium text-foreground/80">
              {t('contact.message')}
            </label>
            <textarea
              id="recruiter-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground resize-none text-sm md:text-base"
              placeholder={t('contact.placeholder.message')}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 disabled:opacity-60 disabled:cursor-not-allowed text-accent-foreground rounded-lg transition-colors font-medium"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            {submitting ? '...' : t('contact.send')}
          </button>
        </form>
      </Section>
    </RecruiterShell>
  );
}
