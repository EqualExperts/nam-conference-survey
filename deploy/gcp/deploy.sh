#!/bin/bash
# =============================================================================
# NAM Conference Survey - GCP Cloud Run Deployment Script
# =============================================================================
#
# This script deploys the application to Google Cloud Run.
# Run from the repository root directory.
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - Docker installed
#   - Cloud SQL instance created with database
#
# Usage:
#   ./deploy/gcp/deploy.sh
#
# Environment variables (required):
#   GCP_PROJECT_ID     - Your GCP project ID
#   GCP_REGION         - GCP region (default: us-central1)
#   CLOUD_SQL_CONNECTION - Cloud SQL connection string (project:region:instance)
#   DATABASE_URL       - PostgreSQL connection URL
#   VITE_ADMIN_USERNAME - Admin username (default: admin)
#   VITE_ADMIN_PASSWORD - Admin password (default: password)
#
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-}"
REGION="${GCP_REGION:-us-central1}"
BACKEND_SERVICE="nam-survey-backend"
FRONTEND_SERVICE="nam-survey-frontend"
CLOUD_SQL_CONNECTION="${CLOUD_SQL_CONNECTION:-}"
DATABASE_URL="${DATABASE_URL:-}"

# Validate required variables
if [[ -z "$PROJECT_ID" ]]; then
    echo -e "${RED}Error: GCP_PROJECT_ID environment variable is required${NC}"
    exit 1
fi

if [[ -z "$CLOUD_SQL_CONNECTION" ]]; then
    echo -e "${RED}Error: CLOUD_SQL_CONNECTION environment variable is required${NC}"
    echo "Format: project-id:region:instance-name"
    exit 1
fi

if [[ -z "$DATABASE_URL" ]]; then
    echo -e "${RED}Error: DATABASE_URL environment variable is required${NC}"
    echo "Format: postgresql://user:password@/dbname?host=/cloudsql/connection-name"
    exit 1
fi

echo -e "${GREEN}=== NAM Conference Survey GCP Deployment ===${NC}"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Set project
echo -e "${YELLOW}Setting GCP project...${NC}"
gcloud config set project "$PROJECT_ID"

# Enable required APIs
echo -e "${YELLOW}Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com \
    run.googleapis.com \
    sqladmin.googleapis.com \
    containerregistry.googleapis.com

# Build and push backend
echo -e "${YELLOW}Building backend image...${NC}"
docker build \
    -t "gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest" \
    -f deploy/gcp/backend.Dockerfile \
    .

echo -e "${YELLOW}Pushing backend image...${NC}"
docker push "gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest"

# Deploy backend to Cloud Run
echo -e "${YELLOW}Deploying backend to Cloud Run...${NC}"
gcloud run deploy "$BACKEND_SERVICE" \
    --image "gcr.io/$PROJECT_ID/$BACKEND_SERVICE:latest" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --add-cloudsql-instances "$CLOUD_SQL_CONNECTION" \
    --set-env-vars "NODE_ENV=production,DATABASE_URL=$DATABASE_URL" \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10

# Get backend URL
BACKEND_URL=$(gcloud run services describe "$BACKEND_SERVICE" \
    --region "$REGION" \
    --format 'value(status.url)')
echo -e "${GREEN}Backend deployed at: $BACKEND_URL${NC}"

# Build frontend with backend URL and admin credentials
echo -e "${YELLOW}Building frontend image...${NC}"
docker build \
    -t "gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest" \
    -f deploy/gcp/frontend.Dockerfile \
    --build-arg "VITE_API_URL=$BACKEND_URL" \
    --build-arg "VITE_ADMIN_USERNAME=${VITE_ADMIN_USERNAME:-admin}" \
    --build-arg "VITE_ADMIN_PASSWORD=${VITE_ADMIN_PASSWORD:-password}" \
    .

echo -e "${YELLOW}Pushing frontend image...${NC}"
docker push "gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest"

# Deploy frontend to Cloud Run
echo -e "${YELLOW}Deploying frontend to Cloud Run...${NC}"
gcloud run deploy "$FRONTEND_SERVICE" \
    --image "gcr.io/$PROJECT_ID/$FRONTEND_SERVICE:latest" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 256Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe "$FRONTEND_SERVICE" \
    --region "$REGION" \
    --format 'value(status.url)')

echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "Frontend: ${GREEN}$FRONTEND_URL${NC}"
echo -e "Backend:  ${GREEN}$BACKEND_URL${NC}"
echo ""
echo "Note: You may need to update the backend's FRONTEND_URL environment variable"
echo "for CORS to work correctly."
