<script setup lang="ts">
import { ref } from 'vue'
import MobileMenu from '../../../components/site/MobileMenu.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

// Le menu s'ouvre en fenêtre modale : un bouton pour l'ouvrir, Échap ou « Fermer » pour le refermer
const open = ref(false)
</script>

<template>
  <BaseButton compact @click="open = true">Ouvrir le menu</BaseButton>
  <MobileMenu v-model="open" />
</template>
