# Usa una imagen base de Node.js
FROM node:20-alpine

# Define los argumentos de construcción
ARG URL_CONNECTION=http://localhost:3000/api
ARG MAPBOX=token
ENV URL_CONNECTION=$URL_CONNECTION
ENV MAPBOX=$MAPBOX

# Copia tus archivos de la aplicación y el script al contenedor
COPY . /usr/src/app

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias necesarias
# RUN npm install

# Ejecuta el script para actualizar env.js con los argumentos
RUN node updateEnv.js

# Usa una imagen base de Nginx para servir el contenido estático
FROM nginx:alpine

# Copia los archivos generados por el primer contenedor al contenedor de Nginx
COPY --from=0 /usr/src/app /usr/share/nginx/html

# Expone el puerto 80 para que Nginx pueda servir tu contenido
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
