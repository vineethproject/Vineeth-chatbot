# Ollama Chatbot: Full-Stack Local AI Chatbot

This project is a full-stack chatbot inspired by ChatGPT, built with FastAPI (Python) for the backend and React (Vite) for the frontend. It uses Ollama to run local LLMs (no OpenAI API required). DevOps best practices are integrated using Docker, GitHub Actions, and Terraform.

## Features
- Conversational chatbot UI (React, Vite)
- FastAPI backend with Ollama (local LLM) integration
- 100% private: your data never leaves your device
- Modern, professional, responsive UI
- Dockerized backend and frontend
- CI/CD pipeline with GitHub Actions
- Infrastructure as Code with Terraform (local Docker provider)

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker
- Terraform
- [Ollama](https://ollama.com/) (for local LLMs)

### Backend (FastAPI + Ollama)
1. Make sure you have [Ollama](https://ollama.com/) installed and running:
   ```powershell
   ollama pull llama2
   ollama run llama2
   ```
2. Install backend dependencies:
   ```powershell
   python -m venv backend-env
   backend-env\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```
3. Run the backend:
   ```powershell
   uvicorn backend:app --reload
   ```
   The backend expects Ollama to be running at `http://localhost:11434`.

### Frontend (React)
1. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```
2. Run the frontend:
   ```powershell
   npm run dev -- --host
   ```
   The frontend expects the backend at `http://localhost:8000` by default.

### Docker
- Build and run backend:
  ```powershell
  docker build -t chatbot-backend .
  docker run -p 8000:8000 chatbot-backend
  ```
- Build and run frontend:
  ```powershell
  cd frontend
  docker build -t chatbot-frontend .
  docker run -p 5173:5173 chatbot-frontend
  ```
- Note: For Docker, ensure Ollama is accessible to the backend container (see Ollama docs for advanced networking).

### Terraform (Local Docker)
1. Initialize and apply:
   ```powershell
   terraform init
   terraform apply
   ```

### CI/CD
- See `.github/workflows/ci-cd.yml` for pipeline details.

## Notes
- No OpenAI API key is required; the backend uses Ollama for local LLM inference.
- For best results, ensure Ollama is running and the model (e.g., `llama2`) is available.
- The frontend and backend are fully containerized for easy deployment.

---

For improvements, consider adding authentication, persistent chat history, or deploying to cloud platforms.


