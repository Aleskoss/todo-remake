import { projects } from "./projects"
import { ToDo } from "./todos"
import { isPast } from "date-fns"
export const dom = (() => {
  let currentProject
  const projectsDiv = document.querySelector('#projects')
  const todosDiv = document.querySelector('#todos')
  const dialog = document.createElement('dialog')
  const loadProjects = () => {
    deleteContainerContent(projectsDiv)
    const projectsLength = projects.getProjects().length
    for(let i = 0; i < projectsLength; i++){
      let projectTitle = projects.getProjects()[i].title
      const para = document.createElement('p')
      para.id = projectTitle
      para.textContent = projectTitle
      projectsDiv.appendChild(para)
    }
    addProjectBtn()
  }
  const loadTodos = (project) => {
    deleteContainerContent(todosDiv)
    addTodoBtn()
    const todosLength = projects.currentProject(project).todos.length
    for(let i = 0; i < todosLength; i++){
      const form = document.createElement('form')
      form.id = projects.currentProject(project).todos[i].id
      form.addEventListener('change', (event) => {
        if(event.target.name === 'checklist'){
          ToDo.saveEditTodo(currentProject,event.target.parentElement.id,event.target.name,event.target.checked)
          loadTodos(currentProject)
        }else{
          ToDo.saveEditTodo(currentProject,event.target.parentElement.id,event.target.name,event.target.value)
          loadTodos(currentProject)
        }
        if(event.target.name === 'priority'){
          projects.sortyByPriority(currentProject)
          loadTodos(currentProject)
        }
      })
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.name = 'checklist'
      checkbox.checked = projects.currentProject(project).todos[i].checklist
      const description = document.createElement('input')
      description.type = 'text'
      description.name = 'description'
      description.value = projects.currentProject(project).todos[i].description
      const dueDate = document.createElement('input')
      dueDate.type = 'date'
      dueDate.name = 'dueDate'
      dueDate.value = projects.currentProject(project).todos[i].dueDate
      if(isPast(dueDate.value)){
        dueDate.style.color = 'red'
      }else{
        dueDate.style.color = 'green'
      }
      const title = document.createElement('input')
      title.type = 'text'
      title.name = 'title'
      title.value = projects.currentProject(project).todos[i].title
      const priority = document.createElement('input')
      priority.type = 'number'
      priority.name = 'priority'
      priority.value = projects.currentProject(project).todos[i].priority
      priority.max = 3
      priority.min = 1
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.addEventListener('click',event => {
        todosDiv.removeChild(event.target.parentElement)
        projects.completeToDo(currentProject,event.target.parentElement.id)
        loadTodos(currentProject)
        console.log(projects.getProjects())
      })
      form.appendChild(checkbox)
      form.appendChild(title)
      form.appendChild(description)
      form.appendChild(dueDate)
      form.appendChild(priority)
      form.appendChild(deleteBtn)
      todosDiv.appendChild(form)
    }
  }
  const addProjectBtn = () => {
    const btn = document.createElement('button')
    btn.textContent = '+'
    projectsDiv.appendChild(btn)
    btn.addEventListener('click', addProjectDialogDisplay)
  }
  const addProjectDialogDisplay = () => {
    document.body.appendChild(dialog)
    const addProjectBtn = document.createElement('button')
    addProjectBtn.textContent = 'Add'
    const projectTitle = document.createElement('input')
    dialog.appendChild(projectTitle)
    dialog.appendChild(addProjectBtn)
    dialog.showModal()
    addProjectBtn.addEventListener('click', () => {
      projects.addProjectToProjects(projectTitle.value)
      deleteContainerContent(dialog)
      loadProjects()
      dialog.close()
    })
  }
  const deleteContainerContent = (container) => {
    while(container.lastChild){
      container.removeChild(container.lastChild)
    }
  }
  const addTodoBtn = () => {
    const btn = document.createElement('button')
    btn.textContent = '+'
    todosDiv.appendChild(btn)
    btn.addEventListener('click',addTodoDialogDisplay)
  }
  const addTodoDialogDisplay = () => {
    const addTodoBtn = document.createElement('button')
    addTodoBtn.textContent = 'Add'
    const title = document.createElement('input')
    const description = document.createElement('input')
    const dueDate = document.createElement('input')
    dueDate.value = ToDo.getCurrentDay()
    dueDate.type = 'date'
    dialog.appendChild(title)
    dialog.appendChild(description)
    dialog.appendChild(dueDate)
    dialog.appendChild(addTodoBtn)
    document.body.appendChild(dialog)
    dialog.showModal()
    addTodoBtn.addEventListener('click',() => {
      projects.addToDoToProject(projects.currentProject(currentProject),title.value,description.value,dueDate.value)
      deleteContainerContent(dialog)
      loadTodos(currentProject)
      dialog.close()
    })
  }
  const init = () => {
    currentProject = 'Default'
    loadProjects()
    loadTodos(currentProject)
    document.addEventListener('click', event => {
      let target = event.target
      if(projects.checkIfValueIsInProject(target.id)){
        currentProject = target.id
        loadTodos(currentProject)
      }
    })
  }
    return {init}
})()