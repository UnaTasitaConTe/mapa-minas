
# Usa una imagen base de Node.js con Alpine
FROM node:20.13.1-alpine3.20 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json .

# Instala todas las dependencias (incluidas las de desarrollo)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Etapa 2: Imagen de Producción
FROM node:20.13.1-alpine3.20 AS production

ARG mongo_url=""
ARG mongo_name=""

ENV MONGODBURL=$mongo_url
ENV MONGODBNAME=$mongo_name

# Configura el directorio de trabajo
WORKDIR /app

# Copia solo el package.json y el package-lock.json desde la etapa de construcción
COPY package*.json .

# Instala solo las dependencias de producción
RUN npm install --omit=dev

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /app/dist
# COPY --from=build /app/.env /app/

# Expone el puerto en el que tu aplicación está escuchando
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["node", "dist/app.js"]
