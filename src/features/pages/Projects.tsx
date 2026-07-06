import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { ProjectsRecruiter } from './recruiter/ProjectsRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildProjectsTf } from './code/projectsTf';

export function Projects() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  return enabled ? <ProjectsRecruiter /> : <CodeFileView model={buildProjectsTf(language)} />;
}
