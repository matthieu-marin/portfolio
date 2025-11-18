import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../i18n/hooks';

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(language === 'fr' ? 'Message envoyé ! (simulation)' : 'Message sent! (simulation)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfoData = {
    id: 'contact',
    title: 'ContactInfo',
    icon: MessageSquare,
    color: 'text-blue-400',
    borderColor: 'border-blue-400',
    info: [
      {
        icon: Mail,
        property: 'email',
        value: 'matthieu.marin@example.com',
        href: 'mailto:matthieu.marin@example.com',
      },
      {
        icon: Phone,
        property: 'phone',
        value: '+33 6 12 34 56 78',
        href: 'tel:+33612345678',
      },
      {
        icon: MapPin,
        property: 'location',
        value: 'Paris, France',
        href: null,
      },
    ],
    social: [
      {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com',
        color: 'text-purple-400',
      },
      {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
        color: 'text-blue-400',
      },
      {
        icon: Twitter,
        label: 'Twitter',
        href: 'https://twitter.com',
        color: 'text-cyan-400',
      },
    ]
  };

  const messageFormData = {
    id: 'message',
    title: 'SendMessage',
    icon: Send,
    color: 'text-green-400',
    borderColor: 'border-green-400',
  };

  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}</span>
          <span className="text-syntax-comment">{t('contact.title')}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400 transition-all duration-300 overflow-hidden"
          >
            <div className="font-mono space-y-2 text-sm md:text-base mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-5 h-5 md:w-6 md:h-6 ${contactInfoData.color} flex-shrink-0`} />
                <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                  <span className="text-syntax-keyword">class</span>{' '}
                  <span className={`text-syntax-class ${contactInfoData.color} break-words`} style={{ fontSize: '1.1em' }}>
                    {contactInfoData.title}
                  </span>{' '}
                  <span className="text-syntax-punctuation">{'{'}</span>
                </div>
              </div>
            </div>
            <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
              {contactInfoData.info.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.property} className="flex items-center gap-2 min-w-0 break-words">
                    <Icon className={`w-3 h-3 md:w-4 md:h-4 ${contactInfoData.color} opacity-60`} />
                    <span className="text-syntax-property">{info.property}</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    {info.href ? (
                      <a 
                        href={info.href}
                        className={`text-syntax-string hover:underline ${contactInfoData.color} transition-colors`}
                      >
                        "{info.value}"
                      </a>
                    ) : (
                      <span className="text-syntax-string">"{info.value}"</span>
                    )}
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                );
              })}
              <div className="pt-2">
                <span className="text-syntax-property">social</span>
                <span className="text-syntax-punctuation">:</span>{' '}
                <span className="text-syntax-punctuation">[</span>
              </div>
              <div className="ml-4 flex flex-wrap gap-3 mt-2 mb-2">
                {contactInfoData.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 md:p-3 bg-background hover:bg-hover rounded-lg transition-colors border-2 ${social.color}`}
                      title={social.label}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  );
                })}
              </div>
              <div>
                <span className="text-syntax-punctuation">];</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <Globe className={`w-3 h-3 md:w-4 md:h-4 ${contactInfoData.color} opacity-60`} />
                <span className="text-syntax-property">availability</span>
                <span className="text-syntax-punctuation">:</span>{' '}
                <span className="text-syntax-string">
                  "{language === 'fr' ? 'Disponible pour de nouveaux projets' : 'Available for new projects'}"
                </span>
                <span className="text-syntax-punctuation">;</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className={`w-3 h-3 md:w-4 md:h-4 ${contactInfoData.color} opacity-60`} />
                <span className="text-syntax-property">responseTime</span>
                <span className="text-syntax-punctuation">:</span>{' '}
                <span className="text-syntax-string">
                  "{language === 'fr' ? '24-48 heures' : '24-48 hours'}"
                </span>
                <span className="text-syntax-punctuation">;</span>
              </div>
            </div>
            <div className="font-mono text-sm md:text-base mt-3">
              <span className="text-syntax-punctuation">{'}'}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-green-400 hover:border-green-400 transition-all duration-300 overflow-hidden"
          >
            <div className="font-mono space-y-2 text-sm md:text-base mb-4">
              <div className="flex items-center gap-3">
                <Send className={`w-5 h-5 md:w-6 md:h-6 ${messageFormData.color} flex-shrink-0`} />
                <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                  <span className="text-syntax-keyword">class</span>{' '}
                  <span className={`text-syntax-class ${messageFormData.color} break-words`} style={{ fontSize: '1.1em' }}>
                    {messageFormData.title}
                  </span>{' '}
                  <span className="text-syntax-punctuation">{'{'}</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="ml-4 md:ml-8 space-y-4 overflow-hidden">
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-xs md:text-sm flex items-center gap-2">
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
                  placeholder={language === 'fr' ? '"Votre nom"' : '"Your name"'}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-xs md:text-sm flex items-center gap-2">
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
                  placeholder={language === 'fr' ? '"votre@email.com"' : '"your@email.com"'}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs md:text-sm flex items-center gap-2">
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
                  placeholder={language === 'fr' ? '"Votre message..."' : '"Your message..."'}
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-syntax-keyword font-mono text-sm">this</span>
                <span className="text-syntax-punctuation font-mono text-sm">.</span>
                <button
                  type="submit"
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors font-mono text-sm md:text-base`}
                >
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{language === 'fr' ? 'send()' : 'send()'}</span>
                </button>
                <span className="text-syntax-punctuation font-mono text-sm">;</span>
              </div>
            </form>
            <div className="font-mono text-sm md:text-base mt-4">
              <span className="text-syntax-punctuation">{'}'}</span>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-syntax-comment text-xs md:text-sm pt-4 space-y-1"
        >
          <div>{'// Feel free to contact me to discuss your projects!'}</div>
          <div>{'// I will be happy to talk with you 🚀'}</div>
        </motion.div>
      </div>
    </div>
  );
}