# 1. Usa uma imagem base do Node.js
FROM node:20-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia os arquivos package.json e package-lock.json (se existir)
# para que possamos instalar as dependências
COPY package*.json ./

# 4. Instala as dependências do Node
RUN npm install

# 5. Copia o restante dos arquivos da aplicação (server.js e index.html)
COPY . .

# 6. A porta que o Express está escutando
EXPOSE 3000

# 7. Comando para rodar a aplicação quando o container iniciar
CMD [ "npm", "start" ]