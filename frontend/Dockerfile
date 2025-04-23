# Imagen base
FROM node:18

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalación limpia
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Solucionar bug de rollup (instalación limpia antes de ejecutar)
RUN rm -rf node_modules package-lock.json && npm install

# Exponer el puerto
EXPOSE 5173

# Comando de arranque
CMD ["npm", "run", "dev"]
