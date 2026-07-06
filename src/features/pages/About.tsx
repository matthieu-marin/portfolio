import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { AboutRecruiter } from './recruiter/AboutRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildReadmeMd } from './code/readmeMd';

export function About() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  return enabled ? <AboutRecruiter /> : <CodeFileView model={buildReadmeMd(language)} />;
}
