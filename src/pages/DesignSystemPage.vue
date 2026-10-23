<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { ENTRIES, FAMILIES, LEGACY_PAGES, PLANNED, TOKEN_PAGES } from './design-system/catalogue'
import DsBackgrounds from './design-system/DsBackgrounds.vue'
import DsColors from './design-system/DsColors.vue'
import DsComponentsAbout from './design-system/DsComponentsAbout.vue'
import DsComponentsHome from './design-system/DsComponentsHome.vue'
import DsComponentsLayout from './design-system/DsComponentsLayout.vue'
import DsComponentsProjects from './design-system/DsComponentsProjects.vue'
import DsDemo from './design-system/DsDemo.vue'
import DsEntry from './design-system/DsEntry.vue'
import DsMotion from './design-system/DsMotion.vue'
import DsSpacing from './design-system/DsSpacing.vue'
import DsTypography from './design-system/DsTypography.vue'

/* Catalogue du design system v1.2 (§6), en développement seulement (architecture technique §5) : les tokens,
   puis une page par composant, rangés par famille. « ?bare » : la démo seule, pour l'iframe d'une page. */
useHead({ title: 'Design system · Costa Maskulov', meta: [{ name: 'robots', content: 'noindex' }] })

const PAGES: Record<string, Component> = {
  couleurs: DsColors,
  'fonds-de-section': DsBackgrounds,
  typographie: DsTypography,
  espacements: DsSpacing,
  motion: DsMotion,
  'ancien-mise-en-page': DsComponentsLayout,
  'ancien-accueil': DsComponentsHome,
  'ancien-projets': DsComponentsProjects,
  'ancien-a-propos': DsComponentsAbout,
}

const route = useRoute()
const id = computed(() => String(route.params.entry ?? ''))
const entry = computed(() => ENTRIES.find((e) => e.id === id.value))
const legacy = computed(() => LEGACY_PAGES.some((p) => p.id === id.value))
const families = FAMILIES.map((name) => ({
  name,
  entries: ENTRIES.filter((e) => e.family === name),
  planned: PLANNED[name],
}))
const link = (entry: string) => ({ name: 'design-system', params: { entry } })
</script>

<template>
  <DsDemo
    v-if="'bare' in route.query && entry"
    :entry="entry"
    :reduced="'reduced' in route.query"
  />
  <main v-else id="contenu" tabindex="-1" class="catalogue">
    <nav class="side" aria-label="Catalogue">
      <RouterLink class="home" :to="link('')">Design system</RouterLink>
      <div class="group">
        <p>Tokens</p>
        <ul>
          <li v-for="p in TOKEN_PAGES" :key="p.id">
            <RouterLink :to="link(p.id)">{{ p.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div v-for="f in families" :key="f.name" class="group">
        <p>{{ f.name }}</p>
        <ul>
          <li v-for="e in f.entries" :key="e.id">
            <RouterLink :to="link(e.id)">{{ e.name }}</RouterLink>
          </li>
          <li v-for="name in f.planned" :key="name" class="planned">{{ name }}</li>
        </ul>
      </div>
      <div class="group">
        <p>À refondre (étape 2 bis)</p>
        <ul>
          <li v-for="p in LEGACY_PAGES" :key="p.id">
            <RouterLink :to="link(p.id)">{{ p.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div :class="['content', { wide: legacy }]">
      <DsEntry v-if="entry" :key="entry.id" :entry="entry" />
      <component :is="PAGES[id]" v-else-if="PAGES[id]" />
      <div v-else class="intro">
        <h1>Design system</h1>
        <p>
          Les briques du portfolio, une par page, avec un panneau de réglages en direct. Référence :
          <code>docs/05-design-system.md</code> v1.2. En gris, les briques prévues qui restent à
          construire.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.catalogue {
  display: grid;
  gap: var(--space-7);
  padding: calc(var(--header-height) + var(--space-7)) var(--gutter) var(--space-9);
}
@media (min-width: 1024px) {
  .catalogue {
    grid-template-columns: 14rem minmax(0, 1fr);
    align-items: start;
  }
  .side {
    position: sticky;
    top: calc(var(--header-height) + var(--space-5));
    max-height: calc(100vh - var(--header-height) - var(--space-7));
    overflow-y: auto;
  }
}
.side {
  display: grid;
  gap: var(--space-5);
  align-content: start;
  font-size: var(--text-sm);
}
.home {
  font-family: var(--font-display);
  font-size: var(--text-lead);
  color: var(--color-text);
  text-decoration: none;
}
.group p {
  margin: 0 0 var(--space-1);
  font-weight: var(--weight-bold);
  color: var(--color-text-subtle);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: var(--border-thin) solid var(--color-border);
}
li a,
.planned {
  display: block;
  padding: var(--space-1) var(--space-3);
}
li a {
  color: var(--color-text-muted);
  text-decoration: none;
}
li a:hover {
  color: var(--color-text);
}
li a.router-link-exact-active {
  margin-left: calc(-1 * var(--border-thin));
  border-left: var(--underline) solid var(--color-highlight);
  color: var(--color-text);
  font-weight: var(--weight-bold);
}
.planned {
  color: var(--neutral-700);
}
.content {
  min-width: 0;
}
/* Les anciennes démos sont des sections pleine largeur */
.content.wide {
  margin-inline: calc(-1 * var(--gutter));
}
.intro {
  display: grid;
  gap: var(--space-4);
}
.intro h1 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h1);
  line-height: var(--leading-display);
}
.intro p {
  margin: 0;
  max-width: var(--measure);
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  color: var(--color-text-muted);
}
code {
  font-size: 0.85em;
  color: var(--color-text-subtle);
}
</style>
