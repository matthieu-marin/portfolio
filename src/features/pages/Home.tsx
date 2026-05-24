import {
  User,
  Code2,
  Rocket,
  Linkedin,
  Mail,
  Download,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { EditableText } from '../../shared/components/EditableText';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeProperty,
  CodeArrayProperty,
  CodeArrayItem,
} from '../../shared/components/layout';
export function Home() {
  const { language } = useLanguage();

  const profileData = {
    name: 'Matthieu Marin',
    role: 'Développeur en alternance — Master Cloud Computing & Mobility',
    bio: {
      fr: "Étudiant en Master Cloud Computing & Mobility (UPJV / INSSET) et alternant chez Renault Digital, je m'appuie sur quatre expériences en développement web pour construire des applications robustes et bien testées. Mes terrains de jeu : Java/Spring Boot côté backend, JavaScript/React côté frontend, et les outils cloud (Google Cloud, Docker) en infrastructure.",
      en: 'Master Cloud Computing & Mobility student at UPJV / INSSET and apprentice at Renault Digital, drawing on four web-development experiences to build robust, well-tested applications. Comfort zone: Java/Spring Boot on the back end, JavaScript/React on the front end, and cloud tooling (Google Cloud, Docker) for infrastructure.',
    },
    stats: [
      { label: { fr: "Années d'expérience pro", en: 'Years of pro experience' }, value: '1+' },
      { label: { fr: 'Expériences en entreprise', en: 'Professional experiences' }, value: '4' },
      { label: { fr: 'Technologies pratiquées', en: 'Technologies used' }, value: '10+' },
    ],
    socialLinks: [
      {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
        color: 'text-blue-400',
      },
      {
        icon: Mail,
        label: 'Email',
        href: 'mailto:matthieumarin51@gmail.com',
        color: 'text-green-400',
      },
    ],
  };

  const expertiseAreas = {
    fr: [
      'Développement web full-stack (JavaScript, Java)',
      'Frameworks modernes : React, Spring Boot',
      'Cloud Computing & applications mobiles',
      'Bases de données relationnelles (MySQL, PostgreSQL) et non relationnelles (MongoDB)',
      'Méthode agile (SCRUM) et gestion de projet',
    ],
    en: [
      'Full-stack web development (JavaScript, Java)',
      'Modern frameworks: React, Spring Boot',
      'Cloud Computing & mobile applications',
      'Relational databases (MySQL, PostgreSQL) and non-relational (MongoDB)',
      'Agile methodology (SCRUM) and project management',
    ],
  };

  const approachPrinciples = {
    fr: [
      "Autonomie et prise d'initiative",
      'Ponctualité et rigueur',
      'Curiosité et apprentissage continu',
      'Veille technologique active',
      'Collaboration en équipe agile',
      'Partage des connaissances',
    ],
    en: [
      'Autonomy and initiative',
      'Punctuality and rigor',
      'Curiosity and continuous learning',
      'Active technology watch',
      'Agile team collaboration',
      'Knowledge sharing',
    ],
  };

  return (
    <PageShell commentTitle="Portfolio.tsx" commentEditKey="home.comment">
      {/* class DeveloppeurAlternant */}
      <CodeCard accentColor="purple" delay={0.1}>
        <ClassHeader
          icon={User}
          title="DeveloppeurAlternant"
          titleEditKey="home.profile.title"
        />
        <ClassBody>
          <CodeProperty
            name="name"
            nameEditKey="home.prop.name"
            value={profileData.name}
            valueEditKey="home.profile.name"
          />
          <CodeProperty
            name="role"
            nameEditKey="home.prop.role"
            value={profileData.role}
            valueEditKey="home.profile.role"
          />
          <CodeProperty
            name="bio"
            nameEditKey="home.prop.bio"
            value={profileData.bio[language]}
            valueEditKey={`home.profile.bio.${language}`}
            multiline
          />
          <CodeArrayProperty name="stats" variant="inline">
            {profileData.stats.map((stat, idx) => (
              <CodeArrayItem key={idx} icon={Sparkles} variant="pill">
                <EditableText
                  value={stat.label[language]}
                  editKey={`home.profile.stats.${idx}.label.${language}`}
                />
                <span className="ml-1 text-syntax-punctuation">·</span>
                <span className="ml-1">
                  <EditableText
                    value={stat.value}
                    editKey={`home.profile.stats.${idx}.value`}
                  />
                </span>
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
          <CodeArrayProperty name="connect" variant="inline">
            {profileData.socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors border border-current/20 bg-current/10 hover:bg-current/20 text-xs md:text-sm ${social.color}`}
                  title={social.label}
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs md:text-sm font-mono">{social.label}</span>
                </a>
              );
            })}
            <a
              href="/cv-matthieu-marin.pdf"
              download
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors border border-current/20 bg-current/10 hover:bg-current/20 text-xs md:text-sm text-accent"
              aria-label="Download CV"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs md:text-sm font-mono">CV</span>
            </a>
          </CodeArrayProperty>
        </ClassBody>
        <ClassClose />
      </CodeCard>

      {/* class CoreExpertise */}
      <CodeCard accentColor="cyan" delay={0.2}>
        <ClassHeader
          icon={Sparkles}
          title="CoreExpertise"
          titleEditKey="home.expertise.title"
        />
        <ClassBody>
          <CodeArrayProperty name="areas">
            {expertiseAreas[language].map((area, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Code2}
                isLast={idx === expertiseAreas[language].length - 1}
              >
                <EditableText
                  value={area}
                  editKey={`home.expertise.areas.${language}.${idx}`}
                />
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
        </ClassBody>
        <ClassClose />
      </CodeCard>

      {/* class WorkApproach */}
      <CodeCard accentColor="pink" delay={0.3}>
        <ClassHeader
          icon={Terminal}
          title="WorkApproach"
          titleEditKey="home.approach.title"
        />
        <ClassBody>
          <CodeArrayProperty name="principles" variant="inline">
            {approachPrinciples[language].map((principle, idx) => (
              <CodeArrayItem key={idx} icon={Rocket} variant="pill">
                <EditableText
                  value={principle}
                  editKey={`home.approach.principles.${language}.${idx}`}
                />
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
        </ClassBody>
        <ClassClose />
      </CodeCard>

      <div className="font-mono text-syntax-comment text-xs md:text-sm pt-4">
        <div>
          {'// export default '}
          <EditableText
            value="FullStackDeveloper"
            editKey="home.exportComment"
            className="text-syntax-comment"
          />
          {';'}
        </div>
      </div>
    </PageShell>
  );
}
