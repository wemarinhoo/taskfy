const btnOpenTask = document.querySelector('[data-open-form-task="open-form-task"]');
const formTask = document.querySelector('[data-form-task="form-task"]');
const btnCloseFormTask = document.querySelector('[data-btn-close-form-task="btn-close-form-task"]')

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