# Mini SaaS CI/CD Project

## Production-Grade DevOps Project with Jenkins + Docker + GitHub + Nginx

This project demonstrates a complete CI/CD pipeline for a containerized Node.js backend application using modern DevOps practices.

It includes:

* Dockerized backend service
* PostgreSQL database
* Redis cache
* Docker Compose orchestration
* Jenkins pipeline automation
* GitHub webhook auto-trigger deployment
* GitHub Actions integration
* Nginx reverse proxy setup
* Automated health checks
* Zero-manual deployment workflow

---

# Project Architecture

```text
Developer Pushes Code
        ↓
GitHub Repository
        ↓
GitHub Webhook
        ↓
Jenkins Auto Trigger
        ↓
Checkout Latest Code
        ↓
Build Docker Image
        ↓
Stop Old Container
        ↓
Run New Container
        ↓
Health Check (/health)
        ↓
SUCCESS
```

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Cache

* Redis

## DevOps Tools

* Docker
* Docker Compose
* Jenkins
* GitHub Actions
* GitHub Webhooks
* Nginx
* ngrok (for local webhook testing)

## Version Control

* Git
* GitHub

---

# Folder Structure

```text
mini-saas-project/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── app.js
│   └── package-lock.json
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
├── Jenkinsfile
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── README.md
```

---

# Key Features

## Dockerized Backend

The backend application runs inside a Docker container for consistent deployment across environments.

## Jenkins CI/CD Pipeline

Automatically:

* pulls latest code
* builds Docker image
* removes old container
* runs new container
* performs health check validation

## GitHub Webhook Automation

Every `git push` triggers Jenkins automatically without manual intervention.

## Nginx Reverse Proxy

Nginx routes incoming traffic from port 80 to the backend service running internally on port 5000.

## Health Monitoring

The `/health` endpoint verifies successful deployment after each pipeline execution.

---

# Jenkins Pipeline Stages

## 1. Checkout Code

Fetch latest code from GitHub repository.

## 2. Build Docker Image

Creates updated backend Docker image.

## 3. Stop Old Container

Stops and removes old running backend container.

## 4. Run New Container

Deploys fresh container using the latest image.

## 5. Health Check

Validates deployment using:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{"status":"ok","service":"backend"}
```

---

# Docker Compose Services

## Services Included

### Backend

Node.js application

### PostgreSQL

Primary database service

### Redis

Caching layer

### Nginx

Reverse proxy and production routing

---

# Example Commands

## Start Services

```bash
docker compose up --build
```

## Stop Services

```bash
docker compose down
```

## Check Running Containers

```bash
docker ps
```

## View Logs

```bash
docker logs <container_name>
```

---

# Production Endpoint

## Health Check

```text
http://localhost/health
```

Returns:

```json
{"status":"ok","service":"backend"}
```

---

# Project Highlights for Recruiters

* Built end-to-end CI/CD pipeline from scratch
* Automated deployment using Jenkins + Docker
* Implemented GitHub webhook-triggered production deployment
* Added Nginx reverse proxy for production architecture
* Integrated PostgreSQL + Redis with Docker Compose
* Added deployment validation using health checks
* Created real-world DevOps workflow used in production systems

---

# Future Improvements

* Deploy to AWS EC2
* Add HTTPS using SSL certificates
* Add Prometheus + Grafana monitoring
* Add Kubernetes deployment
* Add Terraform infrastructure provisioning

---

# Author

Built as a production-grade DevOps portfolio project focused on CI/CD automation and deployment engineering.
