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
import { profile } from './data/profile';

export function Home() {
  const { language } = useLanguage();

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profile.linkedin,
      color: 'text-blue-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${profile.email}`,
      color: 'text-green-400',
    },
  ];

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
            value={profile.name}
            valueEditKey="home.profile.name"
          />
          <CodeProperty
            name="role"
            nameEditKey="home.prop.role"
            value={profile.role[language]}
            valueEditKey={`home.profile.role.${language}`}
          />
          <CodeProperty
            name="bio"
            nameEditKey="home.prop.bio"
            value={profile.bio[language]}
            valueEditKey={`home.profile.bio.${language}`}
            multiline
          />
          <CodeArrayProperty name="stats" variant="inline">
            {profile.stats.map((stat, idx) => (
              <CodeArrayItem key={idx} icon={Sparkles} variant="pill">
                <EditableText
                  value={stat.label[language]}
                  editKey={`home.profile.stats.${idx}.label.${language}`}
                />
                <span className="ml-1 text-syntax-punctuation">·</span>
                <span className="ml-1">
                  <EditableText
                    value={`${stat.value}${stat.suffix ?? ''}`}
                    editKey={`home.profile.stats.${idx}.value`}
                  />
                </span>
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
          <CodeArrayProperty name="connect" variant="inline">
            {socialLinks.map((social) => {
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
              href={profile.cvPath}
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
            {profile.expertise.map((area, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Code2}
                isLast={idx === profile.expertise.length - 1}
              >
                <EditableText
                  value={area[language]}
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
            {profile.principles.map((principle, idx) => (
              <CodeArrayItem key={idx} icon={Rocket} variant="pill">
                <EditableText
                  value={principle[language]}
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
