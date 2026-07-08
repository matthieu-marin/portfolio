import { useMemo } from 'react';
import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { SkillsRecruiter } from './recruiter/SkillsRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildSkillsYml } from './code/skillsYml';

export function Skills() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  const model = useMemo(() => buildSkillsYml(language), [language]);
  return enabled ? <SkillsRecruiter /> : <CodeFileView model={model} syntax="yaml" />;
}
