# Image de production (architecture technique §7) : Node construit le site, Nginx ne sert que les fichiers statiques
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Types et tests déjà vérifiés par le CI avant l'image : pré-rendu direct. check-content refuse le contenu provisoire, csp.ts complète docker/nginx.conf
RUN npm run check-content && npx vite-ssg build && node scripts/csp.ts

FROM nginx:1.29-alpine
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
