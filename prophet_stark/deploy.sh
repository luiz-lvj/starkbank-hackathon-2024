#!/bin/bash

# Configurações iniciais
export PROJECT_ID="platao-stark-hackathon"
export APP=prophetstark 
export REGION="us-central1"
export TAG="gcr.io/$PROJECT_ID/$APP"

# Habilitar serviços necessários
gcloud services enable cloudbuild.googleapis.com \
    containerregistry.googleapis.com \
    run.googleapis.com

# Construir a imagem Docker
docker build --platform linux/amd64 -t $TAG .

# Enviar a imagem para o Google Cloud Build
gcloud builds submit --tag $TAG

# Deploy da aplicação no Google Cloud Run
gcloud run deploy $APP --image $TAG --platform managed --region $REGION --allow-unauthenticated

echo "Deploy concluído!"