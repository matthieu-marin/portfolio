import {
  siReact,
  siTypescript,
  siTailwindcss,
  siFramer,
  siNodedotjs,
  siVuedotjs,
  siMongodb,
  siPhp,
  siWordpress,
  siSpringboot,
  siGooglecloud,
  siDocker,
  siGitlab,
  siDynatrace,
  siGrafana,
  siOpenjdk,
  siPython,
  siJavascript,
  siGit,
  siMysql,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

// Map of normalized tech name → official Simple Icons glyph.
// Normalization: lowercase + strip every non-alphanumeric char,
// so "Spring Boot", "SpringBoot" and "springboot" all match.
const TECH_ICONS: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  motion: siFramer, // "Motion" = Framer Motion
  framer: siFramer,
  nodejs: siNodedotjs,
  node: siNodedotjs,
  vuejs: siVuedotjs,
  vue: siVuedotjs,
  mongodb: siMongodb,
  php: siPhp,
  wordpress: siWordpress,
  springboot: siSpringboot,
  spring: siSpringboot,
  googlecloud: siGooglecloud,
  docker: siDocker,
  gitlab: siGitlab,
  dynatrace: siDynatrace,
  grafana: siGrafana,
  java: siOpenjdk,
  python: siPython,
  javascript: siJavascript,
  git: siGit,
  sql: siMysql, // generic relational DB glyph
};

export function getTechIcon(name: string): SimpleIcon | undefined {
  return TECH_ICONS[name.toLowerCase().replace(/[^a-z0-9]/g, '')];
}
