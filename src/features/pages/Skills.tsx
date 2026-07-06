import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { SkillsRecruiter } from './recruiter/SkillsRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildSkillsYml } from './code/skillsYml';

export function Skills() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  return enabled ? <SkillsRecruiter /> : <CodeFileView model={buildSkillsYml(language)} />;
}
