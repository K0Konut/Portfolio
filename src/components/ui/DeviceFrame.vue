<script setup lang="ts">
import type { Device } from '../../content/types'

/* Cadre d'appareil à proportions fixes (design system § DeviceFrame) : la zone de fond prend la forme
   de la carte ; l'appareil garde ses proportions et « monte » du bas de la zone, coupé d'au plus 15 %
   (navigateur) ou 25 % (téléphone). Captures : 1440 × 900 (navigateur) ou 390 × 844 (téléphone). */
withDefaults(
  defineProps<{
    device: Device
    src?: string
    /** Description de l'écran ; vide dans une carte (le titre suffit) */
    alt?: string
    /** Nom affiché sur l'écran provisoire, sans capture */
    label?: string
    /** Teinte du fond de capture (DA §5) ; violet foncé par défaut */
    stage?: string
  }>(),
  { src: undefined, alt: '', label: '', stage: undefined },
)
/** Taille des captures, par appareil */
const SIZE = { browser: [1440, 900], phone: [390, 844] } as const
</script>

<template>
  <div class="frame" :style="stage ? { '--stage': stage } : undefined">
    <div :class="['dev', `dev-${device}`]">
      <div v-if="device === 'browser'" class="bar" aria-hidden="true"><i /><i /><i /><span /></div>
      <div class="screen">
        <img
          v-if="src"
          :src="src"
          :alt="alt"
          :width="SIZE[device][0]"
          :height="SIZE[device][1]"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="placeholder display" aria-hidden="true">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  --pad: var(--space-5);
  container-type: size;
  /* Une grille peut libérer la zone (BentoGrid : --frame-ratio: auto) */
  aspect-ratio: var(--frame-ratio, 16 / 10);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: var(--pad) var(--pad) 0;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--stage, var(--color-section));
}
.frame:has(.dev-phone) {
  align-items: flex-start;
}
.dev {
  flex: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: var(--border-thin) solid var(--color-border);
  border-bottom: 0;
  background: var(--color-surface);
}
.dev-browser {
  width: min(100cqw - 2 * var(--pad), (100cqh - var(--pad)) * 1.6 / 0.85 - 3rem);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.dev-phone {
  width: min(45cqw, (100cqh - var(--pad)) * 0.615);
  padding-top: var(--space-3);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.bar {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border-thin) solid var(--color-border);
}
.bar i {
  width: var(--space-2);
  height: var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-border);
}
.bar span {
  flex: 1;
  height: var(--space-3);
  margin-left: var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-surface-hover);
}
.screen {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.dev-phone .screen {
  aspect-ratio: 390 / 844;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
/* Écran provisoire, neutre (pas de violet sur violet) */
.placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: var(--space-3);
  background: var(--neutral-850);
  color: var(--neutral-400);
  font-size: var(--text-h3);
  text-align: center;
}
.dev-phone .placeholder {
  font-size: var(--text-body);
}
</style>
