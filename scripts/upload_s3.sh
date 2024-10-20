#!/bin/bash

# Imposta le variabili
export AWS_PROFILE=wedding
export AWS_REGION=eu-west-1
BUCKET_NAME="dev-francis-wedding-frontend"
DISTRIBUTION_ID="ENWYOMI0LW549"  # Inserisci l'ID della tua distribuzione CloudFront
BUILD_DIR="dist"

# Esegui npm run build
echo "Eseguendo 'npm run build'..."
npm run build

# Verifica se il comando è andato a buon fine
if [ $? -ne 0 ]; then
  echo "Errore durante la build."
  exit 1
fi

# Carica i file nel bucket S3
echo "Caricamento dei file nel bucket S3..."
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME

# Verifica se il caricamento è andato a buon fine
if [ $? -ne 0 ]; then
  echo "Errore durante il caricamento dei file su S3."
  exit 1
fi

# Crea una invalidation su CloudFront
echo "Creazione di un'invalidation su CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

# Verifica se l'invalidation è andata a buon fine
if [ $? -ne 0 ]; then
  echo "Errore durante la creazione dell'invalidation su CloudFront."
  exit 1
fi

echo "Deploy completato con successo!"
