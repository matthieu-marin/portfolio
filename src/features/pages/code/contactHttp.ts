// ─────────────────────────────────────────────────────────────
// contact.http (code view) — reconstruit un faux-mais-crédible
// fichier REST Client à partir de `contact` (data/contact.ts).
// Les 3 valeurs du corps JSON sont éditables (ed()) et alimentent
// réellement `handleSend` (voir Contact.tsx) via "Send Request".
// ─────────────────────────────────────────────────────────────
import { ln, blank, p, kw, str, cmt, prop, ed, pn } from './tokens';
import type { CodeFileModel } from './tokens';

const PLACEHOLDERS: Record<'fr' | 'en', { email: string; name: string; message: string }> = {
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

export function buildContactHttp(language: 'fr' | 'en'): CodeFileModel {
  const placeholder = PLACEHOLDERS[language];

  return {
    lines: [
      ln(0, cmt('### Contacter Matthieu Marin')),
      ln(0, cmt('# REST Client — cliquez sur "Send Request" pour envoyer réellement.')),
      ln(0, kw('POST'), p(' '), str('https://matthieu-marin.dev/api/contact'), p(' '), p('HTTP/1.1')),
      ln(0, prop('Content-Type'), pn(':'), p(' '), str('application/json')),
      blank(),
      ln(0, pn('{')),
      ln(
        1,
        prop('"from"'),
        pn(':'),
        p('    '),
        ed('contact.form.email', placeholder.email),
        pn(',')
      ),
      ln(
        1,
        prop('"name"'),
        pn(':'),
        p('    '),
        ed('contact.form.name', placeholder.name),
        pn(',')
      ),
      ln(
        1,
        prop('"message"'),
        pn(':'),
        p(' '),
        ed('contact.form.message', placeholder.message)
      ),
      ln(0, pn('}')),
    ],
  };
}
