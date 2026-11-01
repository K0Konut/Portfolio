---
title: This portfolio
description: 'This site, from method to code: PRD, art direction, design system, mockups, then the build in Vue.'
date: '2026-10'
featured: true
tags: [personal project]
type: Personal project
role: Concept, design and development
duration: Since October 2026, ongoing
team: Solo
stack: [Vue 3, TypeScript, Vite, GSAP, Docker]
code: https://github.com/K0Konut/Portfolio
capture:
  device: browser
  image: capture.png
---

<script setup>
import StatBlock from '../../../src/components/ui/StatBlock.vue'
</script>

## Context

An engineering student at ESIEA, I am looking for an end-of-studies internship in full-stack development.

Until now, I introduced myself with a résumé, LinkedIn and GitHub. They list skills, but show neither my method, nor my creativity, nor who I am: nothing lets a recruiter remember me.

## Need

A single place that makes visible an engineer’s rigour, a web developer’s creativity and my personality.

Two readers to serve. The HR recruiter, who sorts quickly and has no technical background, must understand the profile and get the résumé in one click. The tech lead wants to read a case study, understand the choices and open the code.

## Constraints

- **Budget: €0.** No paid service.
- **Self-hosted.** On my personal server (Proxmox), in a Docker container, behind Nginx Proxy Manager.
- **Search engines.** Pre-rendered pages, in French and English.
- **Accessibility.** WCAG 2.2 level AA; every animation respects “reduce motion”.
- **Variable time.** My availability changes from week to week: the work is split into small, shippable steps.

## Method

Seven phases, in order, each with its deliverable, its Git branch and its approval before moving on.

1. **PRD.** What we build and why.
2. **Brand territory.** Positioning, values, tone of voice.
3. **Art direction.** Colours, typography, motion.
4. **Architecture and UX.** Site map, journeys, wireframes.
5. **Design system.** Tokens and components, with their states.
6. **Mockups.** The key screens, built in code.
7. **Code.** The build in Vue.

The mockups are made directly in code, with the real components: every visual choice is made on a page that switches between several versions, in the browser.

## Technical choices

### A design system before the screens

Generic components, “bricks”, all built on tokens: no hard-coded values. Each has its page in a development catalogue, with live settings, its states and the “reduced motion” mode.

<small>Trade-off: more time before the first screen, fewer fixes afterwards.</small>

### The animated background in plain WebGL

The contour lines on the home page come from a component written for a 3D library, rewritten in WebGL 2 without it: one dependency fewer. A still image with reduced motion, paused when off screen.

<small>Trade-off: a shader to maintain myself.</small>

### Everything self-hosted

Fonts served by the site, a Docker container on my server, no audience measurement: no third-party service, no consent banner.

<small>Trade-off: uptime depends on my server.</small>

### Vue 3, Vite and TypeScript, without Nuxt

Every page is pre-rendered as full HTML with vite-ssg, for search engines. Bilingual routing, `head` tags and the sitemap are put together by hand, in small, readable pieces.

<small>Trade-off: more in-house code than with Nuxt.</small>

## Results

<div class="stats">
  <StatBlock value="7" label="steps, from PRD to code, each approved before the next" :index="0" />
  <StatBlock value="32" label="generic components, each in the catalogue" :index="1" />
  <StatBlock value="98" label="written decisions, each with its reason" :index="2" />
  <StatBlock value="6" label="section backgrounds, against a single one in the first art direction" :before="1" :after="6" :index="3" />
</div>

Lighthouse scores, aiming for 95 or more on all four axes, will be added at launch.

## Lessons

- **Compare rather than describe.** Deciding in front of two to six versions on screen is faster than debating a document.
- **Keep your own method.** An automatic design assistant was tried twice, then removed: it imposed its own process on a project that already had one.
- **Write decisions down.** One line and one reason per decision: you never revisit the same choice twice.
