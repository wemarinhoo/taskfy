output "backend_url" {
  value       = render_service.backend.service_url
  description = "URL da API FastAPI"
}

output "frontend_url" {
  value       = render_service.frontend.service_url
  description = "URL do Frontend"
}