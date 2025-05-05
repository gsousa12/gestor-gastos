#!/bin/sh

echo "Aguardando o banco de dados ficar disponível..."
until nc -z -v -w30 $DATABASE_HOST $DATABASE_PORT; do
  echo "Aguardando conexão com $DATABASE_HOST:$DATABASE_PORT..."
  sleep 2
done

echo "Banco disponível. Executando Prisma generate..."
pnpm prisma generate

echo "Iniciando aplicação..."
node dist/main
