<script setup lang="ts">
import SkipLink from '../../../components/site/SkipLink.vue'
// Le lien d'évitement n'apparaît qu'au focus clavier
</script>

<template>
  <p>Cliquez dans ce cadre, puis appuyez sur Tab.</p>
  <SkipLink />
</template>

<style scoped>
p {
  margin: 0;
}
</style>
