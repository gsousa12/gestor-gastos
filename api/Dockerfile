FROM node:20

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Define o diretório de trabalho
WORKDIR /usr/src/api

# Copia os arquivos necessários primeiro (para melhor cache)
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install

# Copia o restante do código da aplicação
COPY . .

# Compila o projeto NestJS
RUN pnpm build

# Expõe a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main"]
