import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { ExperienceRecruiter } from './recruiter/ExperienceRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildExperienceJava } from './code/experienceJava';

export function Experience() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  return enabled ? <ExperienceRecruiter /> : <CodeFileView model={buildExperienceJava(language)} />;
}
