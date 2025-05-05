FROM node:20

# Ativa o Corepack e o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Define o diretório de trabalho
WORKDIR /usr/src/api

# Copia os arquivos de dependência para cache otimizado
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install

# Copia o restante da aplicação
COPY . .

# # Gera o Prisma Client
# RUN pnpm prisma generate

# Compila o projeto NestJS
RUN pnpm build

# Copia o script de inicialização
COPY start.sh .

# Dá permissão de execução ao script
RUN chmod +x start.sh

# Expõe a porta usada pela aplicação
EXPOSE 3000

# # Comando para rodar a aplicação
# CMD ["node", "dist/main"]

# Comando de inicialização
CMD ["./start.sh"]
