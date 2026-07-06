// ─────────────────────────────────────────────────────────────
// CodeFileView v2 — un vrai buffer librement éditable, façon IDE.
// Un <textarea> transparent (caret visible) est superposé à un <pre>
// colorisé par regex ; tout le texte se modifie au clavier. Seules les
// valeurs générées par un token `ed()` (voir code/tokens.ts) sont
// synchronisées vers la vue recruteur : chaque token produit un matcher
// (préfixe de ligne + délimiteur) qui ré-extrait la valeur à chaque
// frappe. Le texte libre non mappé est éphémère (perdu au changement
// d'onglet, de langue, ou via « Reset edits »).
// ─────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditContext } from '../contexts/EditContext';
import { ImageWithFallback } from './ImageWithFallback';
import type { CodeFileModel } from '../../features/pages/code/tokens';

export type CodeSyntax = 'tsx' | 'java' | 'md' | 'yaml' | 'tf' | 'http';

const INDENT = '  ';
const LINE_HEIGHT_PX = 24; // leading-6 (1.5rem) — partagé par le gutter et la détection de survol

// ── Sérialisation du modèle en texte brut + matchers d'édition ────────────

interface EditMatcher {
  key: string;
  prefix: string; // contenu de la ligne avant la valeur (quote ouvrante incluse)
  quoted: boolean;
  fallback: string;
}

interface ImageHint {
  path: string;
  label: string;
}

function serializeModel(model: CodeFileModel, edits: Record<string, string>) {
  const lines: string[] = [];
  const matchers: EditMatcher[] = [];
  const imgByLine = new Map<number, ImageHint>();

  model.lines.forEach((line, lineIdx) => {
    let s = INDENT.repeat(line.indent);
    for (const tok of line.tokens) {
      if (tok.k === 'edit') {
        const quoted = tok.quoted !== false;
        const q = quoted ? '"' : '';
        matchers.push({ key: tok.key, prefix: s + q, quoted, fallback: tok.value });
        s += q + (edits[tok.key] ?? tok.value) + q;
      } else if (tok.k === 'img') {
        imgByLine.set(lineIdx, { path: tok.path, label: tok.label });
        s += `"${tok.path}"`;
      } else {
        s += tok.t;
      }
    }
    lines.push(s);
  });

  return { text: lines.join('\n'), matchers, imgByLine };
}

// Ré-extrait les valeurs mappées du buffer courant. Recherche séquentielle
// ancrée en début de ligne ; si une ligne a été réécrite au point de ne plus
// matcher son préfixe, la valeur est simplement ignorée (texte libre).
function extractEdits(text: string, matchers: EditMatcher[]): Array<{ key: string; value: string }> {
  const hay = '\n' + text;
  const out: Array<{ key: string; value: string }> = [];
  let from = 0;

  for (const m of matchers) {
    const needle = '\n' + m.prefix;
    const i = hay.indexOf(needle, from);
    if (i === -1) continue;
    const valueStart = i + needle.length;
    const lineEnd = hay.indexOf('\n', valueStart);
    let valueEnd: number;
    if (m.quoted) {
      const quote = hay.indexOf('"', valueStart);
      if (quote === -1 || (lineEnd !== -1 && quote > lineEnd)) {
        from = valueStart;
        continue; // quote fermante supprimée — on ne synchronise pas
      }
      valueEnd = quote;
    } else {
      valueEnd = lineEnd === -1 ? hay.length : lineEnd;
    }
    out.push({ key: m.key, value: hay.slice(valueStart, valueEnd) });
    from = valueEnd;
  }

  return out;
}

// ── Coloration syntaxique légère (regex, par ligne) ───────────────────────

interface Rule {
  re: RegExp;
  cls: string;
}

const CLS = {
  comment: 'text-syntax-comment',
  keyword: 'text-syntax-keyword',
  string: 'text-syntax-string',
  type: 'text-syntax-class',
  property: 'text-syntax-property',
  fn: 'text-syntax-function',
} as const;

const RULES: Record<CodeSyntax, Rule[]> = {
  tsx: [
    { re: /\/\/.*$/, cls: CLS.comment },
    { re: /"[^"]*"|'[^']*'/, cls: CLS.string },
    { re: /\b(import|export|from|const|default|new|return|type)\b/, cls: CLS.keyword },
    { re: /\b[A-Z][A-Za-z0-9_]*\b/, cls: CLS.type },
    { re: /[\w$]+(?=\s*:)/, cls: CLS.property },
    { re: /\b\d+(\.\d+)?\b/, cls: CLS.string },
  ],
  java: [
    { re: /\/\/.*$/, cls: CLS.comment },
    { re: /^\s*(\/\*\*?|\*).*$/, cls: CLS.comment },
    { re: /"[^"]*"/, cls: CLS.string },
    { re: /@\w+/, cls: CLS.fn },
    { re: /\b(package|import|public|static|final|class|new|return|void)\b/, cls: CLS.keyword },
    { re: /\b[A-Z][A-Za-z0-9_.<>]*\b/, cls: CLS.type },
    { re: /\b\d+(\.\d+)?\b/, cls: CLS.string },
  ],
  yaml: [
    { re: /#.*$/, cls: CLS.comment },
    { re: /^\s*-?\s*[\w_]+(?=:)/, cls: CLS.property },
    { re: /"[^"]*"/, cls: CLS.string },
    { re: /\b\d+(\.\d+)?\b/, cls: CLS.string },
  ],
  md: [
    { re: /^#{1,6} .*$/, cls: CLS.keyword },
    { re: /^> /, cls: CLS.comment },
    { re: /!?\[[^\]]*\]/, cls: CLS.property },
    { re: /\(https?:[^)]*\)/, cls: CLS.string },
    { re: /^[-|] /, cls: CLS.comment },
  ],
  tf: [
    { re: /#.*$/, cls: CLS.comment },
    { re: /"[^"]*"/, cls: CLS.string },
    { re: /\b(resource|terraform|required_providers|provider)\b/, cls: CLS.keyword },
    { re: /^\s*[\w_]+(?=\s*=)/, cls: CLS.property },
    { re: /\b\d+(\.\d+)?\b/, cls: CLS.string },
  ],
  http: [
    { re: /^#.*$/, cls: CLS.comment },
    { re: /^(GET|POST|PUT|PATCH|DELETE)\b/, cls: CLS.keyword },
    { re: /\bHTTP\/1\.1\b/, cls: CLS.keyword },
    { re: /"[^"]*"/, cls: CLS.string },
    { re: /https?:\/\/\S+/, cls: CLS.string },
    { re: /^[A-Za-z-]+(?=:)/, cls: CLS.property },
    { re: /\b\d+(\.\d+)?\b/, cls: CLS.string },
  ],
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Applique les règles en cascade : la première qui matche découpe la ligne,
// le segment avant passe aux règles suivantes, le segment après re-teste tout.
function highlightSegment(segment: string, rules: Rule[]): string {
  if (segment === '') return '';
  for (let r = 0; r < rules.length; r++) {
    const match = rules[r].re.exec(segment);
    if (!match || match[0] === '') continue;
    const before = segment.slice(0, match.index);
    const after = segment.slice(match.index + match[0].length);
    return (
      highlightSegment(before, rules.slice(r + 1)) +
      `<span class="${rules[r].cls}">${escapeHtml(match[0])}</span>` +
      highlightSegment(after, rules)
    );
  }
  return escapeHtml(segment);
}

function highlight(text: string, syntax: CodeSyntax): string {
  const rules = RULES[syntax];
  return text
    .split('\n')
    .map((line) => highlightSegment(line, rules))
    .join('\n');
}

// ── Composant ──────────────────────────────────────────────────────────────

interface CodeFileViewProps {
  model: CodeFileModel;
  syntax: CodeSyntax;
  action?: { label: string; onClick: () => void };
}

export function CodeFileView({ model, syntax, action }: CodeFileViewProps) {
  const { edits, setEdit, hasEdits } = useEditContext();

  const editsRef = useRef(edits);
  editsRef.current = edits;

  const { matchers, imgByLine } = useMemo(
    () => serializeModel(model, {}),
    [model]
  );

  const [text, setText] = useState(() => serializeModel(model, editsRef.current).text);
  const [hoverImage, setHoverImage] = useState<{ hint: ImageHint; top: number } | null>(null);

  // Changement de document (onglet remonté ou langue) → buffer canonique.
  const modelRef = useRef(model);
  useEffect(() => {
    if (modelRef.current !== model) {
      modelRef.current = model;
      setText(serializeModel(model, editsRef.current).text);
    }
  }, [model]);

  // « Reset edits » → on restaure aussi le texte libre du buffer.
  const prevHasEdits = useRef(hasEdits);
  useEffect(() => {
    if (prevHasEdits.current && !hasEdits) {
      setText(serializeModel(model, {}).text);
    }
    prevHasEdits.current = hasEdits;
  }, [hasEdits, model]);

  const handleChange = (nextText: string) => {
    setText(nextText);
    for (const { key, value } of extractEdits(nextText, matchers)) {
      const matcher = matchers.find((m) => m.key === key);
      const current = editsRef.current[key] ?? matcher?.fallback;
      if (value !== current) setEdit(key, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart, selectionEnd, value } = el;
      const next = value.slice(0, selectionStart) + INDENT + value.slice(selectionEnd);
      handleChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + INDENT.length;
      });
    }
    if (e.key === 'Escape') e.currentTarget.blur();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imgByLine.size === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const line = Math.floor((e.clientY - rect.top) / LINE_HEIGHT_PX);
    const hint = imgByLine.get(line);
    setHoverImage(hint ? { hint, top: (line + 1) * LINE_HEIGHT_PX } : null);
  };

  const lineCount = text.split('\n').length;
  const gutter = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  const highlighted = useMemo(() => highlight(text, syntax), [text, syntax]);

  return (
    <div className="relative h-full font-mono text-xs md:text-sm leading-6">
      {action && (
        <button
          onClick={action.onClick}
          className="absolute top-2 right-4 z-20 px-2 py-0.5 rounded text-[11px] text-syntax-string border border-border bg-editor/80 backdrop-blur-sm hover:border-accent/60 transition-colors"
        >
          ▷ {action.label}
        </button>
      )}

      <div className="h-full overflow-auto">
        <div className="flex min-w-full w-max">
          {/* Gutter — sticky pour rester visible au scroll horizontal */}
          <pre
            aria-hidden="true"
            className="sticky left-0 z-10 bg-editor text-right select-none opacity-30 pl-4 pr-3 py-4 md:py-6 m-0 whitespace-pre leading-6"
          >
            {gutter}
          </pre>

          <div
            className="relative flex-1 py-4 md:py-6 pr-8"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverImage(null)}
          >
            <pre
              aria-hidden="true"
              className="m-0 whitespace-pre leading-6 min-h-full"
              dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
            />
            <textarea
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              wrap="off"
              aria-label="Source editor"
              className="absolute inset-0 w-full h-full py-4 md:py-6 bg-transparent text-transparent outline-none resize-none overflow-hidden whitespace-pre leading-6"
              style={{
                font: 'inherit',
                lineHeight: 'inherit',
                caretColor: 'var(--foreground)',
              }}
            />

            {hoverImage && (
              <div
                className="absolute left-8 z-30 pointer-events-none rounded-lg border border-border bg-editor shadow-lg p-1.5"
                style={{ top: hoverImage.top + 8 }}
              >
                <ImageWithFallback
                  src={hoverImage.hint.path}
                  alt={hoverImage.hint.label}
                  className="w-48 h-28 object-cover rounded"
                />
                <p className="text-[10px] opacity-60 mt-1 px-0.5">{hoverImage.hint.label}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
