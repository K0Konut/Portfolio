import type { SkillCategory } from '../../src/content/types'

/* Compétences (page À propos), par catégorie. `site` : techno utilisée par ce site, mise en avant. */
export default [
  {
    title: 'front',
    skills: [
      { name: 'Vue.js', site: true },
      { name: 'Nuxt' },
      { name: 'TypeScript', site: true },
      { name: 'JavaScript', site: true },
      { name: 'HTML', site: true },
      { name: 'CSS', site: true },
      { name: 'Vite', site: true },
    ],
  },
  {
    title: 'back',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Python' },
      { name: 'REST API' },
      { name: 'MongoDB' },
      { name: 'SQL' },
    ],
  },
  {
    title: 'UI / UX',
    skills: [{ name: 'Figma' }, { name: 'responsive' }, { name: 'accessibility' }],
  },
  {
    title: 'tools and deployment',
    skills: [
      { name: 'Git', site: true },
      { name: 'GitHub', site: true },
      { name: 'npm', site: true },
      { name: 'Docker', site: true },
      { name: 'Linux', site: true },
      { name: 'Proxmox', site: true },
      { name: 'Nginx Proxy Manager', site: true },
    ],
  },
  {
    title: 'method',
    skills: [{ name: 'sprints' }, { name: 'daily' }],
  },
] satisfies SkillCategory[]
