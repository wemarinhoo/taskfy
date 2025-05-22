resource "render_service" "backend" {
  name         = "taskfy-api"
  service_type = "web"
  repo_url     = "https://github.com/wemarinhoo/taskfy"
  branch       = "main"
  runtime      = "python"
  build_command = "cd backend && pip install -r requirements.txt"
  start_command = "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT"
  plan         = "free"
  region       = "oregon"

  env_vars = [
    {
      key   = "DEBUG"
      value = "False"
    }
  ]
}