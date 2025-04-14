# Usa la imagen base de node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Comando para iniciar la aplicación
CMD ["node", "server.js"] 

# Expone el puerto que esa tu app
EXPOSE 3000


