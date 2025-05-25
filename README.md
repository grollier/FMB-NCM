# 🚀 FMB-NCM Template  

**A Full-Stack FastAPI + Next.js + MongoDB Starter Template**  

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)](https://chakra-ui.com/)

## 📖 Introduction  

This template is a **heavily modified** version of [Tiangolo’s Full-Stack FastAPI Template](https://github.com/tiangolo/full-stack-fastapi-template), optimized for **MongoDB** and **Next.js (App Router)** with **Chakra UI v3+**.  

### 🔥 Key Differences  

| Original Template | This Template |  
|-------------------|---------------|  
| SQLAlchemy (PostgreSQL) | **MongoDB + Beanie ODM** |  
| Vite.js (React) | **Next.js (App Router)** |  
| Traditional CSS/JS | **Chakra UI v3 + Motion Animations** |  

### ❓ Why These Changes?  

- **Short Answer**: I love Python + MongoDB, and wanted a modern full-stack template for them.  
- **Long Answer**: Most companies I’ve worked with use SQL databases, so I built this to explore **MongoDB’s flexibility** while keeping FastAPI’s power.  

---

## 🛠️ Tech Stack  

### **Backend**  
- **FastAPI** – High-performance Python framework.  
- **MongoDB** – NoSQL database for flexible data modeling.  
- **Beanie ODM** – Async MongoDB ODM (like SQLAlchemy for Mongo). [📚 Docs](https://beanie-odm.dev/)  
- **Motor** – Async MongoDB driver. [⚡ Docs](https://motor.readthedocs.io/)  
- **UV (Astral)** – Blazing-fast Python package manager (written in Rust). [🚀 Docs](https://github.com/astral-sh/uv)  
- **MailHog** – Local email testing (instead of SMTP). [📧 GitHub](https://github.com/mailhog/MailHog)  

### **Frontend**  
- **Next.js (App Router)** – React framework for server-side rendering.  
- **Chakra UI v3+** – Modular, accessible component library.  
- **HeyOpenAPI** – Auto-generated API client. [🔗 GitHub](https://github.com/hey-api/openapi-ts)  
- **Framer Motion** – Smooth animations. [🎬 Docs](https://www.framer.com/motion/)  

---

## ⚙️ Setup & Configuration  

### **Before You Run**  
1. Create a `.env` file in the root directory (use `.env.example` as a reference).  
2. Configure these **required** variables:  

```env
# Core Settings
DOMAIN="localhost"  
FRONTEND_HOST="http://localhost:3000"  
ENVIRONMENT="local"  # (local|staging|production)  

# Security
SECRET_KEY="your_strong_secret_here"  
SESSION_SECRET="another_strong_secret"  

# Database (MongoDB)
MONGO_HOST="your_mongo_host"  
MONGO_DB="your_db_name"  
MONGO_USER="your_username"  
MONGO_PASSWORD="your_password"  

# Superuser (Admin)
FIRST_SUPERUSER="admin@example.com"  
FIRST_SUPERUSER_PASSWORD="secure_password"  

# Docker (Optional)
DOCKER_IMAGE_BACKEND="backend_image_name"  
DOCKER_IMAGE_FRONTEND="frontend_image_name"
```

# Generating the API Client

Run this script to sync your frontend with the FastAPI OpenAPI spec:
```bash
npm run generate-client  # Updates types & SDK
```

🏃‍♂️ # Running the Project
With Docker (Recommended)
```docker
docker-compose up --build
```

# Manually
1. Backend:
   if you have not started the proyect you need to initialized it
```bash
uv init --app
uv add fastapi --extra standard
```
   after that you can sync using uv command:
```bash
uv sync
```

2. frontend
```bash
cd frontend && npm install  
npm run dev
```

📝 Notes

    This README will evolve as the project grows. Check back for updates!

    Want to contribute? Open an issue or PR!
