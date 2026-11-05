# Image de production (architecture technique §7) : Node construit le site, Nginx ne sert que les fichiers statiques
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Types et tests déjà vérifiés par le CI avant l'image : pré-rendu direct. check-content refuse le contenu provisoire, csp.ts écrit la configuration Nginx avec la CSP complète
RUN npm run check-content && npx vite-ssg build && node scripts/csp.ts > nginx.conf

FROM nginx:1.29-alpine
# Relie l'image au dépôt sur GHCR (visibilité et page du paquet)
LABEL org.opencontainers.image.source=https://github.com/K0Konut/Portfolio
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
