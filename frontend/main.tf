resource "render_service" "frontend" {
  name         = "meu-frontend"
  service_type = "web"
  repo_url     = "https://github.com/wemarinhoo/taskfy"
  branch       = "main"
  runtime      = "node"
  build_command = "cd frontend && npm install && npm run build"
  plan         = "free"
  region       = "oregon"

  env_vars = [
    {
      key   = "VITE_API_URL"  # Exemplo para Vite/React
      value = render_service.backend.service_url
    }
  ]
}