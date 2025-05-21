from fastapi import status
from app import schemas

def test_create_task(client):
    task_data = {"title": "Test Task", "description": "Test Description", "done": False}
    response = client.post("/tasks/", json=task_data)
    
    assert response.status_code == status.HTTP_201_CREATED 
    created_task = response.json()
    assert created_task["title"] == task_data["title"]
    assert created_task["description"] == task_data["description"]
    assert created_task["done"] == task_data["done"]
    assert "id" in created_task

def test_get_task(client):
    # Primeiro cria uma tarefa para testar
    create_response = client.post("/tasks", json={"title": "Test Task"})
    assert create_response.status_code == 201
    task_id = create_response.json()["id"]
    
    # Agora testa o GET
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["id"] == task_id

def test_get_nonexistent_task(client):
    response = client.get("/tasks/9999")
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_get_all_tasks(client):
    # Cria algumas tarefas primeiro
    client.post("/tasks/", json={"title": "Task 1", "description": "Desc 1", "done": False})
    client.post("/tasks/", json={"title": "Task 2", "description": "Desc 2", "done": True})
    
    response = client.get("/tasks/")
    assert response.status_code == status.HTTP_200_OK
    tasks = response.json()
    assert len(tasks) >= 2

def test_update_task(client):
    # Cria uma tarefa
    create_response = client.post("/tasks/", json={"title": "Original", "description": "Original", "done": False})
    task_id = create_response.json()["id"]
    
    # Atualiza a tarefa
    update_data = {"title": "Updated", "description": "Updated", "done": True}
    response = client.put(f"/tasks/{task_id}", json=update_data)
    
    assert response.status_code == status.HTTP_200_OK
    updated_task = response.json()
    assert updated_task["title"] == update_data["title"]
    assert updated_task["description"] == update_data["description"]
    assert updated_task["done"] == update_data["done"]

def test_delete_task(client):
    # Cria uma tarefa
    create_response = client.post("/tasks/", json={"title": "To Delete", "description": "Delete me", "done": False})
    task_id = create_response.json()["id"]
    
    # Deleta a tarefa
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Task deleted successfully"
    
    # Verifica se foi realmente deletada
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND

def test_mark_task_completed(client):
    # Cria uma tarefa não concluída
    create_response = client.post("/tasks/", json={"title": "Incomplete", "description": "Desc", "done": False})
    task_id = create_response.json()["id"]
    
    # Marca como concluída
    response = client.patch(f"/tasks/{task_id}/complete")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["done"] is True
    
    # Verifica no GET
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.json()["done"] is True