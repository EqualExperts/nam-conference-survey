# GCP Cloud Run Deployment

This directory contains configuration for deploying the NAM Conference Survey to Google Cloud Platform using Cloud Run.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Cloud Run      │────▶│  Cloud Run      │────▶│  Cloud SQL      │
│  (Frontend)     │     │  (Backend)      │     │  (PostgreSQL)   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
     nginx:8080          NestJS:8080             PostgreSQL:5432
```

- **Frontend**: Static React app served by nginx
- **Backend**: NestJS API with Prisma ORM
- **Database**: Cloud SQL PostgreSQL instance

## Prerequisites

1. **GCP Project** with billing enabled
2. **gcloud CLI** installed and authenticated
3. **Docker** installed locally
4. **APIs enabled**:
   - Cloud Run API
   - Cloud SQL Admin API
   - Container Registry API
   - Cloud Build API (if using automated builds)

## Step 1: Create Cloud SQL Instance

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Create PostgreSQL instance
gcloud sql instances create nam-survey-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1 \
    --root-password=YOUR_SECURE_PASSWORD

# Create database
gcloud sql databases create nam_survey \
    --instance=nam-survey-db

# Create user (optional - can use postgres user)
gcloud sql users create survey_user \
    --instance=nam-survey-db \
    --password=YOUR_USER_PASSWORD
```

Note the connection name (format: `project-id:region:instance-name`):
```bash
gcloud sql instances describe nam-survey-db --format='value(connectionName)'
```

## Step 2: Configure Environment Variables

Set these environment variables before deploying:

```bash
export GCP_PROJECT_ID="your-project-id"
export GCP_REGION="us-central1"
export CLOUD_SQL_CONNECTION="your-project-id:us-central1:nam-survey-db"
export DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@/nam_survey?host=/cloudsql/your-project-id:us-central1:nam-survey-db"
```

## Step 3: Deploy

### Option A: Manual Deployment Script

```bash
# From repository root
./deploy/gcp/deploy.sh
```

### Option B: Cloud Build (CI/CD)

Set up a Cloud Build trigger connected to your repository:

```bash
gcloud builds submit \
    --config=deploy/gcp/cloudbuild.yaml \
    --substitutions=_BACKEND_URL="https://your-backend-url.run.app",_CLOUD_SQL_CONNECTION="project:region:instance"
```

### Option C: Manual Docker Commands

```bash
# Build and push backend
docker build -t gcr.io/$GCP_PROJECT_ID/nam-survey-backend -f deploy/gcp/backend.Dockerfile .
docker push gcr.io/$GCP_PROJECT_ID/nam-survey-backend

# Deploy backend
gcloud run deploy nam-survey-backend \
    --image gcr.io/$GCP_PROJECT_ID/nam-survey-backend \
    --region $GCP_REGION \
    --platform managed \
    --allow-unauthenticated \
    --add-cloudsql-instances $CLOUD_SQL_CONNECTION \
    --set-env-vars "NODE_ENV=production,DATABASE_URL=$DATABASE_URL"

# Get backend URL
BACKEND_URL=$(gcloud run services describe nam-survey-backend --region $GCP_REGION --format 'value(status.url)')

# Build frontend with backend URL
docker build -t gcr.io/$GCP_PROJECT_ID/nam-survey-frontend \
    -f deploy/gcp/frontend.Dockerfile \
    --build-arg VITE_API_URL=$BACKEND_URL .
docker push gcr.io/$GCP_PROJECT_ID/nam-survey-frontend

# Deploy frontend
gcloud run deploy nam-survey-frontend \
    --image gcr.io/$GCP_PROJECT_ID/nam-survey-frontend \
    --region $GCP_REGION \
    --platform managed \
    --allow-unauthenticated
```

## Configuration Reference

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@/db?host=/cloudsql/...` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://nam-survey-frontend-xxx.run.app` |
| `PORT` | Server port (Cloud Run sets this) | `8080` |

### Frontend Build Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL (baked into build) | `https://nam-survey-backend-xxx.run.app` |

## Post-Deployment

### Update CORS (if needed)

After deployment, update the backend's `FRONTEND_URL` to allow CORS from the frontend:

```bash
gcloud run services update nam-survey-backend \
    --region $GCP_REGION \
    --set-env-vars "FRONTEND_URL=https://nam-survey-frontend-xxx.run.app"
```

### Run Database Migrations

Migrations run automatically on backend startup. To run manually:

```bash
gcloud run jobs create run-migrations \
    --image gcr.io/$GCP_PROJECT_ID/nam-survey-backend \
    --region $GCP_REGION \
    --add-cloudsql-instances $CLOUD_SQL_CONNECTION \
    --set-env-vars "DATABASE_URL=$DATABASE_URL" \
    --command "npx" \
    --args "prisma,migrate,deploy"

gcloud run jobs execute run-migrations --region $GCP_REGION
```

### Seed Database (optional)

```bash
gcloud run jobs create seed-database \
    --image gcr.io/$GCP_PROJECT_ID/nam-survey-backend \
    --region $GCP_REGION \
    --add-cloudsql-instances $CLOUD_SQL_CONNECTION \
    --set-env-vars "DATABASE_URL=$DATABASE_URL" \
    --command "npx" \
    --args "prisma,db,seed"

gcloud run jobs execute seed-database --region $GCP_REGION
```

## Troubleshooting

### Container fails to start

Check Cloud Run logs:
```bash
gcloud run services logs read nam-survey-backend --region $GCP_REGION
```

### Database connection issues

1. Verify Cloud SQL connection name is correct
2. Ensure Cloud Run service account has `Cloud SQL Client` role
3. Check DATABASE_URL format uses Unix socket path

### CORS errors

1. Verify `FRONTEND_URL` environment variable on backend
2. Check that frontend is using correct `VITE_API_URL`

## Cost Optimization

Cloud Run charges based on usage. For a low-traffic survey:

- Set `--min-instances 0` to scale to zero when idle
- Use `--cpu-throttling` to reduce costs during idle
- Cloud SQL `db-f1-micro` tier is cheapest (~$7/month)

## Files in this Directory

| File | Purpose |
|------|---------|
| `README.md` | This documentation |
| `backend.Dockerfile` | Production backend image |
| `frontend.Dockerfile` | Production frontend image |
| `nginx.conf` | Nginx config for SPA routing |
| `cloudbuild.yaml` | Cloud Build CI/CD config |
| `deploy.sh` | Manual deployment script |
