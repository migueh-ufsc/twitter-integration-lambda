#!/bin/bash

# Buildar o projeto TypeScript
npm run build:prod

# Instalar dependências de produção
mkdir -p dist/node_modules
cp package.json package-lock.json dist/
cd dist/
npm install --production
cd ..

# Zipar os arquivos
zip -r lambda-function.zip dist/*

# Fazer o upload para o AWS Lambda
aws lambda update-function-code --function-name twitter-integration --zip-file fileb://lambda-function.zip --profile lambda-deploy

# Limpar o arquivo zip após o upload
rm lambda-function.zip