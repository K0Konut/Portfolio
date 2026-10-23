<script setup lang="ts">
import type { Entry } from './catalogue'

// Référence d'un composant du catalogue : options, slots et événements
defineProps<{ entry: Entry }>()
</script>

<template>
  <section v-if="entry.props.length || entry.slots || entry.events" aria-label="Référence">
    <h2>Référence</h2>
    <table v-if="entry.props.length">
      <thead>
        <tr>
          <th scope="col">Option</th>
          <th scope="col">Type</th>
          <th scope="col">Défaut</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in entry.props" :key="p.name">
          <th scope="row">
            <code>{{ p.name }}</code>
          </th>
          <td>
            <code>{{ p.type }}</code>
          </td>
          <td>{{ p.default ?? '—' }}</td>
          <td>{{ p.description }}</td>
        </tr>
      </tbody>
    </table>
    <dl v-if="entry.slots || entry.events" class="refs">
      <template v-for="s in entry.slots" :key="s.name">
        <dt>
          Slot <code>{{ s.name }}</code>
        </dt>
        <dd>{{ s.description }}</dd>
      </template>
      <template v-for="e in entry.events" :key="e.name">
        <dt>
          Événement <code>{{ e.name }}</code>
        </dt>
        <dd>{{ e.description }}</dd>
      </template>
    </dl>
  </section>
</template>

<style scoped>
section {
  overflow-x: auto;
}
h2 {
  margin: 0 0 var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-text-subtle);
}
code {
  font-size: 0.9em;
  color: var(--color-text);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
th,
td {
  padding: var(--space-3) var(--space-3) var(--space-3) 0;
  border-bottom: var(--border-thin) solid var(--color-border);
  text-align: left;
  vertical-align: top;
}
thead th {
  color: var(--color-text-subtle);
}
.refs {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-2) var(--space-5);
  margin: var(--space-5) 0 0;
  font-size: var(--text-sm);
}
.refs dd {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
