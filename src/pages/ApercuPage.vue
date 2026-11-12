<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageIntro from '../components/mise-en-page/PageIntro.vue'
import LangSwitch from '../components/site/LangSwitch.vue'
import { useLocale } from '../composables/useLocale'
import { isObject } from '../content/check'
import { parseProject } from '../content/projects'
import { SITE } from '../content/site'
import type { Project } from '../content/types'
import type { Locale } from '../router/routes'
import EtudeDeCasPage from './EtudeDeCasPage.vue'

/* Aperçu d'une entrée de Dashility (architecture technique §4) : Dashility ouvre cette page avec
   ?dashility-preview=<jeton> ; l'entrée, dans sa version en cours, est lue depuis le navigateur (sans clé ni
   cookie) et affichée avec la page du site qui lui correspond. Pré-rendue vide : rien n'est lu au build. */
const route = useRoute()
const { t } = useI18n()
const { locale } = useLocale()

interface Preview {
  status: 'draft' | 'published' | 'modified'
  enComplete: boolean
  expiresAt: string
}

/** L'entrée de l'aperçu, ou le message à afficher à sa place (document UX de Dashility, « États ») */
async function read(
  token: unknown,
  l: Locale,
): Promise<{ preview: Preview; project: Project } | string> {
  if (typeof token !== 'string' || !token) return t('preview.expired')
  let res: Response
  try {
    res = await fetch(
      new URL(`/api/preview/${encodeURIComponent(token)}?locale=${l}`, SITE.analytics.endpoint),
    )
  } catch {
    return t('preview.offline')
  }
  const body: unknown = await res.json().catch(() => null)
  const data = isObject(body) ? body : {}
  if (!res.ok) {
    // Erreurs de Dashility : { error: { code, message } }
    const code = isObject(data.error) ? data.error.code : undefined
    if (code === 'preview_entry_deleted') return t('preview.deleted')
    return res.status === 404 || res.status === 410 ? t('preview.expired') : t('preview.offline')
  }
  // Seules les études de cas ont une page à elles ; les autres types n'ont pas encore d'aperçu
  if (data.type !== 'projets') return t('preview.type', { type: String(data.type) })
  try {
    return { preview: data as unknown as Preview, project: parseProject(data, 'aperçu') }
  } catch (e) {
    return t('preview.missing', { field: (e as { field?: string }).field ?? '?' })
  }
}

/** undefined : chargement */
const state = ref<Awaited<ReturnType<typeof read>>>()
let request = 0
async function load() {
  state.value = undefined
  const id = ++request
  const result = await read(route.query['dashility-preview'], locale.value)
  // Une réponse plus ancienne (changement de langue rapide) ne remplace pas la dernière
  if (id === request) state.value = result
}
// Navigateur seulement : onMounted ne tourne pas au pré-rendu. Changer de langue garde la même page (watch)
onMounted(load)
watch(locale, load)

const until = computed(
  () =>
    typeof state.value === 'object' &&
    new Intl.DateTimeFormat(locale.value, {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(state.value.preview.expiresAt)),
)
</script>

<template>
  <EtudeDeCasPage v-if="typeof state === 'object'" :preview="state.project" />
  <main v-else id="contenu" tabindex="-1" :aria-busy="!state">
    <PageIntro :title="state ? t('preview.unavailable') : t('preview.loading')">
      <template v-if="state" #default>{{ state }}</template>
    </PageIntro>
    <SectionWave :seed="7" from="violet" to="nuit" />
  </main>
  <!-- Collé en bas de l'écran plutôt qu'en haut : l'en-tête fixe du site y est déjà. En fin de page, il
       reprend sa place avant le pied de page sans le couvrir -->
  <aside class="banner" :aria-label="t('preview.label')">
    <div class="container inner">
      <p>
        <strong>{{ t('preview.label') }}</strong>
        <template v-if="typeof state === 'object'">
          {{ t(`preview.status.${state.preview.status}`) }}
          {{ t('preview.until', { date: until }) }}
        </template>
      </p>
      <p v-if="locale === 'en' && typeof state === 'object' && !state.preview.enComplete">
        {{ t('preview.enIncomplete') }}
      </p>
      <LangSwitch variant="header" />
    </div>
  </aside>
</template>

<style scoped>
/* Les couleurs de l'en-tête : le bandeau appartient à l'outil, pas au contenu prévisualisé */
.banner {
  --color-focus: var(--color-header-accent);
  position: sticky;
  bottom: 0;
  z-index: 20;
  background: var(--color-header-bg);
  color: var(--color-header-text);
  border-top: var(--border-thin) solid var(--color-header-accent);
  padding-inline: var(--gutter);
}
.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 var(--space-6);
  padding-block: var(--space-1);
}
p {
  margin: 0;
  font-size: var(--text-sm);
}
strong {
  margin-right: var(--space-2);
  color: var(--color-header-accent);
}
.lang {
  margin-left: auto;
}
</style>
