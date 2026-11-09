<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatBlock from '../../components/ui/StatBlock.vue'
import { caseSections } from '../../content/projects'
import type { Project } from '../../content/types'

/* Corps d'une étude de cas, construit champ par champ (architecture technique §4) : une section par champ
   rempli, dans l'ordre du gabarit. Les textes riches viennent de Dashility, déjà filtrés (liste fermée de
   balises, texte échappé) : ils sont insérés tels quels. Mise en forme : EtudeDeCasPage (.prose). */
const props = defineProps<{ project: Project }>()
const { t } = useI18n()
const body = props.project.body
</script>

<template>
  <div class="prose">
    <template v-for="key in caseSections(project)" :key="key">
      <h2 :id="key">{{ t(`case.sections.${key}`) }}</h2>
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="key === 'contexte' || key === 'besoin'" class="rich" v-html="body[key]" />
      <template v-else-if="key === 'methode'">
        <p v-if="body.methodeIntro">{{ body.methodeIntro }}</p>
        <ol>
          <li v-for="item in body.methode" :key="item.title">
            <strong>{{ item.title }}</strong>
            <div class="rich" v-html="item.html" />
          </li>
        </ol>
      </template>
      <template v-else-if="key === 'choix'">
        <template v-for="item in body.choix" :key="item.title">
          <h3>{{ item.title }}</h3>
          <div class="rich" v-html="item.html" />
          <small v-if="item.tradeOff">{{ t('case.tradeOff', { text: item.tradeOff }) }}</small>
        </template>
      </template>
      <template v-else-if="key === 'resultats'">
        <div v-if="body.resultats.length" class="stats">
          <StatBlock v-for="(stat, i) in body.resultats" :key="i" v-bind="stat" :index="i" />
        </div>
        <div v-if="body.conclusion" class="rich" v-html="body.conclusion" />
      </template>
      <ul v-else>
        <li v-for="item in body[key as 'contraintes' | 'enseignements']" :key="item.title">
          <strong>{{ item.title }}</strong>
          <div class="rich" v-html="item.html" />
        </li>
      </ul>
      <!-- eslint-enable vue/no-v-html -->
    </template>
  </div>
</template>
