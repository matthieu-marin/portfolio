export type TokenKind = 'plain' | 'keyword' | 'type' | 'string' | 'comment' | 'number' | 'property' | 'function' | 'punct' | 'annotation';

export type CodeToken =
  | { k: TokenKind; t: string }
  | { k: 'edit'; key: string; value: string; quoted?: boolean }
  | { k: 'img'; path: string; label: string };

export type CodeLine = { indent: number; tokens: CodeToken[] };
export type CodeFileModel = { lines: CodeLine[] };

// Factories
export const p = (t: string): CodeToken => ({ k: 'plain', t });
export const kw = (t: string): CodeToken => ({ k: 'keyword', t });
export const ty = (t: string): CodeToken => ({ k: 'type', t });
export const str = (t: string): CodeToken => ({ k: 'string', t });
export const cmt = (t: string): CodeToken => ({ k: 'comment', t });
export const num = (t: string): CodeToken => ({ k: 'number', t });
export const prop = (t: string): CodeToken => ({ k: 'property', t });
export const fn = (t: string): CodeToken => ({ k: 'function', t });
export const pn = (t: string): CodeToken => ({ k: 'punct', t });
export const ann = (t: string): CodeToken => ({ k: 'annotation', t });
export const ed = (key: string, value: string, quoted = true): CodeToken => ({ k: 'edit', key, value, quoted });
export const img = (path: string, label: string): CodeToken => ({ k: 'img', path, label });
export const ln = (indent: number, ...tokens: CodeToken[]): CodeLine => ({ indent, tokens });
export const blank = (): CodeLine => ({ indent: 0, tokens: [] });
