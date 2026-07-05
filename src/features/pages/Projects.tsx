import {
  ExternalLink,
  Github,
  Code2,
  Rocket,
  Cat,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { ImagePreviewTooltip } from '../../shared/components/ImagePreviewTooltip';
import { EditableText } from '../../shared/components/EditableText';
import { TechIcon } from '../../shared/components/TechIcon';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeProperty,
  CodeArrayProperty,
  CodeArrayItem,
  type AccentColor,
} from '../../shared/components/layout';

type Project = {
  id: string;
  title: string;
  icon: typeof Code2;
  accentColor: AccentColor;
  description: string;
  repository?: string;
  technologies: Array<{
    name: string;
    skillId: string | null;
    description: string;
    details: string;
  }>;
  features: string[];
  previews: Array<{ label: string; imageUrl: string }>;
  status: string;
  github?: string;
  demo?: string;
};

export function Projects() {
  const { t } = useLanguage();
  const { targetProjectId, setTargetSkillId } = useNavigation();
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Projets réels dérivés de info.md (1 portfolio + 2 stages).
  // TODO github URL: à compléter quand l'utilisateur fournira son URL GitHub.
  const projects: Project[] = [
    {
      id: 'portfolio',
      title: 'PortfolioIDE',
      icon: Code2,
      accentColor: 'purple',
      description:
        'Portfolio interactif inspiré de VS Code avec terminal intégré et thèmes personnalisés',
      technologies: [
        { name: 'React', skillId: 'react', description: 'Bibliothèque UI moderne pour interfaces interactives', details: "Utilisé pour : architecture composants, hooks, gestion d'état" },
        { name: 'TypeScript', skillId: null, description: 'Superset typé de JavaScript', details: 'Utilisé pour : sûreté de type, autocomplétion IDE, refactor sereins' },
        { name: 'TailwindCSS', skillId: null, description: 'Framework CSS utility-first', details: 'Utilisé pour : styling, système de thèmes, responsive' },
        { name: 'Motion', skillId: null, description: "Bibliothèque d'animation pour React", details: 'Utilisé pour : transitions de pages, effets au survol' },
      ],
      features: [
        'Système multi-thèmes (Dark, Light, Steampunk, Cyberpunk, Synthwave, Galaxy, Nord, Pixel)',
        'Terminal interactif avec commandes Unix simulées',
        'Navigation par explorateur de fichiers',
        'Bilingue (FR/EN) et responsive mobile',
      ],
      previews: [],
      status: 'Production',
    },
    {
      id: 'iot-territoire',
      title: 'TerritoireConnecteDurable',
      icon: Radio,
      accentColor: 'blue',
      description:
        'Plateforme web IoT pour la gestion de données capteurs, développée chez Faubourg Numérique en collaboration avec La Somme Numérique',
      technologies: [
        { name: 'NodeJS', skillId: 'nodejs', description: 'Runtime JavaScript serveur', details: 'Utilisé pour : ingestion des données capteurs, API REST' },
        { name: 'VueJS', skillId: 'vuejs', description: 'Framework JavaScript progressif', details: 'Utilisé pour : interface de visualisation des données IoT' },
        { name: 'MongoDB', skillId: 'mongodb', description: 'Base NoSQL orientée documents', details: 'Utilisé pour : stockage flexible des relevés capteurs' },
      ],
      features: [
        'Ingestion de données IoT (capteurs Internet des Objets)',
        'Interface de visualisation des relevés',
        'Collaboration avec La Somme Numérique',
        "Livré dans le cadre d'un stage de 4 mois",
      ],
      previews: [],
      status: 'Livré',
    },
    {
      id: 'chatterie-vitrine',
      title: 'ChatterieTerreBrascoSite',
      icon: Cat,
      accentColor: 'orange',
      description:
        "Site vitrine de l'association Chatterie de la Terre de Brasco, démarré en 2022 et finalisé lors du second stage en 2023",
      technologies: [
        { name: 'PHP', skillId: 'php', description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site et templates' },
        { name: 'WordPress', skillId: 'wordpress', description: 'CMS open-source', details: 'Utilisé pour : gestion de contenu et structure du site vitrine' },
      ],
      features: [
        "Site vitrine pour l'association",
        'Gestion de contenu via WordPress',
        'Premier stage : conception et démarrage du site',
        'Second stage : finalisation et livraison',
      ],
      previews: [],
      status: 'Livré',
    },
  ];

  useEffect(() => {
    if (targetProjectId) {
      const currentRef = projectRefs.current[targetProjectId];
      if (currentRef) {
        currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetProjectId]);

  return (
    <PageShell commentTitle={t('projects.title')} commentEditKey="projects.comment">
      <div className="space-y-6 md:space-y-8">
        {projects.map((project, projectIndex) => {
          const Icon = project.icon;
          const isTargeted = project.id === targetProjectId;
          const hasPreviews = project.previews.length > 0;

          return (
            <CodeCard
              key={project.id}
              ref={(el) => {
                projectRefs.current[project.id] = el;
              }}
              accentColor={project.accentColor}
              delay={0.1 + projectIndex * 0.1}
              highlighted={isTargeted}
            >
              <ClassHeader
                icon={Icon}
                title={project.title}
                titleEditKey={`projects.${projectIndex}.title`}
                rightSlot={
                  (project.github || project.demo) && (
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 md:p-2 hover:bg-background rounded transition-colors"
                          title={t('projects.viewCode')}
                          aria-label="View code"
                        >
                          <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 md:p-2 hover:bg-background rounded transition-colors"
                          title={t('projects.viewDemo')}
                          aria-label="View demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                    </div>
                  )
                }
              />
              <ClassBody>
                <CodeProperty
                  name="status"
                  value={project.status}
                  valueEditKey={`projects.${projectIndex}.status`}
                />
                {project.repository && (
                  <CodeProperty
                    name="repository"
                    value={project.repository}
                    link={project.repository}
                  />
                )}
                <CodeArrayProperty name="technologies" variant="inline">
                  {project.technologies.map((tech, idx) => {
                    const inner = (
                      <CodeArrayItem
                        key={idx}
                        variant="pill"
                        leading={<TechIcon name={tech.name} className="w-3.5 h-3.5" />}
                      >
                        <EditableText
                          value={tech.name}
                          editKey={`projects.${projectIndex}.tech.${idx}.name`}
                        />
                      </CodeArrayItem>
                    );
                    return tech.skillId ? (
                      <ItemTooltip
                        key={idx}
                        itemName={tech.name}
                        description={tech.description}
                        details={tech.details}
                        type="class"
                        onClick={() => {
                          setTargetSkillId(tech.skillId!);
                          window.dispatchEvent(new Event('navigate-to-skill'));
                        }}
                      >
                        {inner}
                      </ItemTooltip>
                    ) : (
                      inner
                    );
                  })}
                </CodeArrayProperty>
                <CodeArrayProperty name="features">
                  {project.features.map((feature, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Rocket}
                      isLast={idx === project.features.length - 1}
                    >
                      <EditableText
                        value={feature}
                        editKey={`projects.${projectIndex}.features.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
                {hasPreviews && (
                  <CodeArrayProperty name="previews">
                    {project.previews.map((preview, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ImageIcon className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 opacity-60" />
                        <ImagePreviewTooltip
                          label={preview.label}
                          imageUrl={preview.imageUrl}
                        >
                          <span className="text-syntax-string cursor-pointer hover:underline">
                            "{preview.label}"
                          </span>
                        </ImagePreviewTooltip>
                        {idx < project.previews.length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </CodeArrayProperty>
                )}
              </ClassBody>
              <ClassClose />
            </CodeCard>
          );
        })}
      </div>
    </PageShell>
  );
}
