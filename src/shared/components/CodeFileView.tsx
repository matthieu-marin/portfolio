import { motion } from 'motion/react';
import { EditableText } from './EditableText';
import { ImagePreviewTooltip } from './ImagePreviewTooltip';
import type { CodeFileModel, CodeToken } from '../../features/pages/code/tokens';

const KIND_CLASS: Record<string, string> = {
  plain: '', keyword: 'text-syntax-keyword', type: 'text-syntax-class',
  string: 'text-syntax-string', comment: 'text-syntax-comment', number: 'text-syntax-string',
  property: 'text-syntax-property', function: 'text-syntax-function',
  punct: 'text-syntax-punctuation', annotation: 'text-syntax-function',
};

function Token({ token }: { token: CodeToken }) {
  if (token.k === 'edit') {
    const q = token.quoted !== false;
    return (
      <span className="text-syntax-string">
        {q && '"'}
        <EditableText value={token.value} editKey={token.key} className="text-syntax-string" />
        {q && '"'}
      </span>
    );
  }
  if (token.k === 'img') {
    return (
      <ImagePreviewTooltip label={token.label} imageUrl={token.path}>
        <span className="text-syntax-string underline decoration-dotted cursor-help">"{token.path}"</span>
      </ImagePreviewTooltip>
    );
  }
  return <span className={KIND_CLASS[token.k]}>{token.t}</span>;
}

export function CodeFileView({ model, action }: { model: CodeFileModel; action?: { label: string; beforeLine: number; onClick: () => void } }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className="font-mono text-xs md:text-sm p-4 md:p-6 leading-6">
      {model.lines.map((line, i) => (
        <div key={i}>
          {action && action.beforeLine === i + 1 && (
            <div className="pl-12 md:pl-14">
              <button onClick={action.onClick}
                className="text-syntax-comment text-[11px] hover:text-syntax-function underline underline-offset-2 transition-colors">
                ▷ {action.label}
              </button>
            </div>
          )}
          <div className="flex">
            <span className="w-8 md:w-10 flex-shrink-0 text-right pr-3 md:pr-4 select-none opacity-30">{i + 1}</span>
            <span className="whitespace-pre-wrap break-words min-w-0" style={{ paddingLeft: `${line.indent * 1}rem` }}>
              {line.tokens.map((tok, j) => <Token key={j} token={tok} />)}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
