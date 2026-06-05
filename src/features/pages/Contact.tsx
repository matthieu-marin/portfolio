import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLanguage } from '../../i18n/hooks';
import { EditableText } from '../../shared/components/EditableText';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeProperty,
  CodeArrayProperty,
} from '../../shared/components/layout';
import { getContactProvider } from '../contact';
import { toast } from 'sonner';

export function Contact() {
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

  const contactInfo = [
    {
      icon: Mail,
      property: 'email',
      value: 'matthieumarin51@gmail.com',
      href: 'mailto:matthieumarin51@gmail.com',
    },
    {
      icon: Phone,
      property: 'phone',
      value: '07.83.33.47.50',
      href: 'tel:+33783334750',
    },
    {
      icon: MapPin,
      property: 'location',
      value: 'Saint-Quentin, Hauts-de-France, France',
      href: undefined,
    },
  ];

  const social = [
    // TODO github URL: à compléter quand l'utilisateur fournira son URL GitHub.
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
      color: 'text-blue-400',
    },
  ];

  return (
    <PageShell commentTitle={t('contact.title')} commentEditKey="contact.comment">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeCard accentColor="blue" delay={0.1} initialX={-20}>
          <ClassHeader
            icon={MessageSquare}
            title="ContactInfo"
            titleEditKey="contact.class.contactInfo"
          />
          <ClassBody>
            {contactInfo.map((info) => (
              <CodeProperty
                key={info.property}
                name={info.property}
                nameEditKey={`contact.prop.info.${info.property}`}
                value={info.value}
                valueEditKey={`contact.info.${info.property}`}
                link={info.href}
                icon={info.icon}
              />
            ))}
            <CodeArrayProperty name="social" variant="inline">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 bg-background hover:bg-hover rounded-lg transition-colors border ${s.color} border-current/30`}
                    title={s.label}
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs md:text-sm font-mono">{s.label}</span>
                  </a>
                );
              })}
            </CodeArrayProperty>
            <CodeProperty
              name="availability"
              nameEditKey="contact.prop.availability"
              value={t('contact.availability')}
              valueEditKey="contact.availability"
              icon={Globe}
            />
          </ClassBody>
          <ClassClose />
        </CodeCard>

        <CodeCard accentColor="green" delay={0.2} initialX={20}>
          <ClassHeader
            icon={Send}
            title="SendMessage"
            titleEditKey="contact.class.sendMessage"
          />
          <form onSubmit={handleSubmit} className="ml-4 md:ml-8 space-y-4 overflow-hidden">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-mono text-xs md:text-sm flex items-center gap-2"
              >
                <span className="text-syntax-property">name</span>
                <span className="text-syntax-punctuation">:</span>
                <span className="text-syntax-keyword">string</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm md:text-base font-mono"
                placeholder={`"${t('contact.placeholder.name')}"`}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-mono text-xs md:text-sm flex items-center gap-2"
              >
                <span className="text-syntax-property">email</span>
                <span className="text-syntax-punctuation">:</span>
                <span className="text-syntax-keyword">string</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm md:text-base font-mono"
                placeholder={`"${t('contact.placeholder.email')}"`}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="font-mono text-xs md:text-sm flex items-center gap-2"
              >
                <span className="text-syntax-property">message</span>
                <span className="text-syntax-punctuation">:</span>
                <span className="text-syntax-keyword">string</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 md:px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground resize-none text-sm md:text-base font-mono"
                placeholder={`"${t('contact.placeholder.message')}"`}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-syntax-keyword font-mono text-sm">this</span>
              <span className="text-syntax-punctuation font-mono text-sm">.</span>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-accent hover:bg-accent/80 disabled:opacity-60 disabled:cursor-not-allowed text-accent-foreground rounded-lg transition-colors font-mono text-sm md:text-base"
              >
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{submitting ? '...' : 'send()'}</span>
              </button>
              <span className="text-syntax-punctuation font-mono text-sm">;</span>
            </div>
          </form>
          <ClassClose />
        </CodeCard>
      </div>
      <div className="font-mono text-syntax-comment text-xs md:text-sm pt-4 space-y-1">
        <div>{'// Feel free to contact me to discuss your projects!'}</div>
        <div>{'// I will be happy to talk with you 🚀'}</div>
      </div>
    </PageShell>
  );
}
