# Terraform configuration for deploying the chatbot backend (FastAPI) and frontend (React)

provider "docker" {}

resource "docker_image" "backend" {
  name         = "chatbot-backend:latest"
  build {
    context    = "${path.module}"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "chatbot-backend"
  image = docker_image.backend.name
  ports {
    internal = 8000
    external = 8000
  }
  env = [
    "OPENAI_API_KEY=sk-...replace-with-your-key..."
  ]
}

resource "docker_image" "frontend" {
  name         = "chatbot-frontend:latest"
  build {
    context    = "${path.module}/frontend"
    dockerfile = "frontend/Dockerfile"
  }
}

resource "docker_container" "frontend" {
  name  = "chatbot-frontend"
  image = docker_image.frontend.name
  ports {
    internal = 5173
    external = 5173
  }
  depends_on = [docker_container.backend]
}
