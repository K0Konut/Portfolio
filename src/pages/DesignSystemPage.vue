<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ENTRIES, FAMILIES, TOKEN_PAGES } from './design-system/catalogue'
import DsEntry from './design-system/DsEntry.vue'

/* Catalogue du design system v1.2 (§6), en développement seulement (architecture technique §5) : les tokens,
   puis une page par composant, rangés par famille. La démo d'un composant a sa propre route (DsDemo). */
useHead({ title: 'Design system · Costa Maskulov', meta: [{ name: 'robots', content: 'noindex' }] })

const route = useRoute()
const id = computed(() => String(route.params.entry ?? ''))
const entry = computed(() => ENTRIES.find((e) => e.id === id.value))
const page = computed(() => TOKEN_PAGES.find((p) => p.id === id.value))
const families = FAMILIES.map((name) => ({
  name,
  entries: ENTRIES.filter((e) => e.family === name),
}))
const link = (entry: string) => ({ name: 'design-system', params: { entry } })
</script>

<template>
  <main id="contenu" tabindex="-1" class="catalogue">
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
        </ul>
      </div>
    </nav>

    <div class="content">
      <DsEntry v-if="entry" :key="entry.id" :entry="entry" />
      <component :is="page.component" v-else-if="page" />
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
li a {
  display: block;
  padding: var(--space-1) var(--space-3);
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
.content {
  min-width: 0;
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

<style>
/* Styles communs du catalogue (page de développement) : intitulés et champs */
.catalogue .ds-label {
  margin: 0 0 var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-text-subtle);
}
.catalogue .ds-field {
  min-height: var(--target-min);
  padding: 0 var(--space-3);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  color: var(--color-text);
  font: inherit;
  font-weight: var(--weight-regular);
}
</style>
