#!/bin/bash
# Quick redeploy script for GCP Cloud Run
# Prompts for admin password to avoid storing secrets in repo

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "NAM Survey - GCP Deployment"
echo "==========================="
echo ""

# Prompt for admin password
read -s -p "Enter admin password: " ADMIN_PASSWORD
echo ""

if [[ -z "$ADMIN_PASSWORD" ]]; then
    echo "Error: Admin password cannot be empty"
    exit 1
fi

echo ""
echo "Deploying to GCP..."
echo ""

cd "$PROJECT_ROOT"
gcloud builds submit \
    --config=deploy/gcp/cloudbuild.yaml \
    --substitutions=_VITE_ADMIN_PASSWORD="$ADMIN_PASSWORD" \
    --project=nam-demo-476015
