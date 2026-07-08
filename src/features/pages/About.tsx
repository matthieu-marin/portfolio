import { useMemo } from 'react';
import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { AboutRecruiter } from './recruiter/AboutRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildReadmeMd } from './code/readmeMd';

export function About() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  const model = useMemo(() => buildReadmeMd(language), [language]);
  return enabled ? <AboutRecruiter /> : <CodeFileView model={model} syntax="md" />;
}
