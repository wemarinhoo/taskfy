const btnOpenTask = document.querySelector('[data-open-form-task="open-form-task"]');
const formTask = document.querySelector('[data-form-task="form-task"]');
const btnCloseFormTask = document.querySelector('[data-btn-close-form-task="btn-close-form-task"]')
const taskForm = document.querySelector('[data-task-form="task-form"]')
const title = document.querySelector('[data-title="title"]') 
const description = document.querySelector('[data-description="description"]') 
const buttonAddTask = document.querySelector('[data-button-add-task="button-add-task"]') 

function openFormTask(){
  formTask.classList.remove('hidden')
  formTask.classList.add('flex')
}

function closeFormTask(){
  formTask.classList.remove('flex')
  formTask.classList.add('hidden')
}

btnOpenTask.addEventListener('click', openFormTask)
btnCloseFormTask.addEventListener('click', closeFormTask)

const API_URL = "http://localhost:8000"

async function fetchTasks() {
  try{
    const response = await fetch(`${API_URL}/tasks`)
    const tasks = await response.json()

    const pendingTasks = tasks.filter(task => !task.done);

    const taskList = document.querySelector('[data-task-list="task-list"]')
    taskList.innerHTML = ""

    pendingTasks.forEach(task => {
      const taskElement = document.createElement('tbody')
      taskElement.innerHTML = `
        <tr class="grid grid-cols-12 gap-4 mb-5">
          <td class="col-start-1 col-end-4 whitespace-nowrap text-lg font-body text-white overflow-hidden truncate animate-fade-in-scale">${task.title}</td>
          <td class="col-start-5 col-end-10 whitespace-nowrap text-lg font-body pl-1 text-white overflow-hidden truncate animate-fade-in-scale">${task.description}</td>
          <td class="col-start-11 whitespace-nowrap text-lg font-body text-right">
            <span href="#" class="text-s0 text-lg cursor-pointer hover:underline animate-fade-in-scale" onclick="deleteTask(${task.id})">Excluir</span>
          </td>
          <td class="col-start-12 whitespace-nowrap text-lg font-body text-right">
            <span href="#" class="text-p1 text-lg cursor-pointer hover:underline animate-fade-in-scale" onclick="completeTask(${task.id})">Concluir</span>
          </td>
        </tr>
      `
      taskList.appendChild(taskElement);
    });
  } catch (error){
      console.error("Erro ao buscar tarefas:", error);
  }
}

async function createTask(title, description) {
  try {
      const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              title: title,
              description: description,
          }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro detalhado:", errorData);
        throw new Error(`Erro HTTP: ${response.status}`);
      } else{
        taskForm.reset()
        formTask.classList.remove("flex")
        formTask.classList.add("hidden")
      }

      fetchTasks();
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    }
}

async function deleteTask(taskId) {
  try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: "DELETE",
      });

      if (!response.ok) {
          throw new Error("Erro ao deletar tarefa");
      }

      fetchTasks();
  } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
  }
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = title.value.trim();
  const taskDescription = description.value.trim();

  if (!taskTitle) {
    alert("O título da tarefa é obrigatório!");
    return;
  }

  createTask(taskTitle, taskDescription);
});

async function completeTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao marcar tarefa como concluída");
    }

    fetchTasks()
  } catch (error){
    console.error(error)
  }
}

fetchTasks()