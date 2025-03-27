# Etapa de construcción
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && \
    echo "Contenido de /app/dist/angular/browser:" && \
    ls -la /app/dist/angular/browser && \
    echo "¿Existe index.html?" && \
    [ -f /app/dist/angular/browser/index.html ] || (echo "ERROR: No se encontró index.html" && exit 1)

# Etapa de producción
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/angular/browser /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
EXPOSE 80
