# Imagem base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3333

# Comando padrão
CMD ["npm", "run", "start:dev"]
