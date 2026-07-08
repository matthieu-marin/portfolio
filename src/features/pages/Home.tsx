import { useMemo } from 'react';
import { useRenderer } from '../../shared/contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';
import { HomeRecruiter } from './recruiter/HomeRecruiter';
import { CodeFileView } from '../../shared/components/CodeFileView';
import { buildProfilTsx } from './code/profilTsx';

export function Home() {
  const { enabled } = useRenderer();
  const { language } = useLanguage();
  const model = useMemo(() => buildProfilTsx(language), [language]);
  return enabled ? <HomeRecruiter /> : <CodeFileView model={model} syntax="tsx" />;
}
