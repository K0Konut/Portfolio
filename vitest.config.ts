import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      // Node par défaut ; un test de composant demande le DOM avec « // @vitest-environment happy-dom »
      environment: 'node',
      include: ['tests/unit/**/*.test.ts'],
    },
  }),
)
