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
    const header = document.createElement('h5')
    header.textContent = 'Projekty'
    projectsDiv.appendChild(header)
    const projectsLength = projects.getProjects().length
    for(let i = 0; i < projectsLength; i++){
      const div = document.createElement('div')
      let projectTitle = projects.getProjects()[i].title
      const para = document.createElement('p')
      para.id = projectTitle
      para.textContent = projectTitle
      const removeBtn = document.createElement('button')
      removeBtn.textContent = 'x'
      removeBtn.addEventListener('click', () => {
        div.parentElement.removeChild(div)
        projects.removeProject(para.textContent)
      })
      div.appendChild(para)
      div.appendChild(removeBtn)
      projectsDiv.appendChild(div)
    }
    addProjectBtn()
  }
  const loadTodos = (project) => {
    deleteContainerContent(todosDiv)
    const todosLength = project.todos.length
    for(let i = 0; i < todosLength; i++){
      const form = document.createElement('form')
      form.id = project.todos[i].id
      form.addEventListener('change', (event) => {
        if(event.target.name === 'checklist'){
          ToDo.saveEditTodo(currentProject,event.target.parentElement.id,event.target.name,event.target.checked)
          loadTodos(projects.currentProject(currentProject))
        }else{
          ToDo.saveEditTodo(currentProject,event.target.parentElement.id,event.target.name,event.target.value)
          loadTodos(projects.currentProject(currentProject))
        }
        if(event.target.name === 'priority'){
          projects.sortyByPriority(currentProject)
          loadTodos(projects.currentProject(currentProject))
        }
      })
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.name = 'checklist'
      checkbox.checked = project.todos[i].checklist
      const description = document.createElement('input')
      description.type = 'text'
      description.name = 'description'
      description.value = project.todos[i].description
      const dueDate = document.createElement('input')
      dueDate.type = 'date'
      dueDate.name = 'dueDate'
      dueDate.value = project.todos[i].dueDate
      if(isPast(dueDate.value)){
        dueDate.style.color = '#EF4444'
      }else{
        dueDate.style.color = 'green'
      }
      const title = document.createElement('input')
      title.type = 'text'
      title.name = 'title'
      title.value = project.todos[i].title
      const priority = document.createElement('input')
      priority.type = 'number'
      priority.name = 'priority'
      priority.value = project.todos[i].priority
      priority.max = 3
      priority.min = 1
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.addEventListener('click',event => {
        todosDiv.removeChild(event.target.parentElement)
        projects.completeToDo(currentProject,event.target.parentElement.id)
        loadTodos(projects.currentProject(currentProject))
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
    addTodoBtn()
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
    addProjectBtn.type = 'submit'
    const form = document.createElement('form')
    const projectTitle = document.createElement('input')
    projectTitle.type = 'text'
    projectTitle.name = 'project-title'
    projectTitle.required = true
    form.appendChild(projectTitle)
    form.appendChild(addProjectBtn)
    dialog.appendChild(form)
    dialog.showModal()
    form.addEventListener('submit', (event) => {
      console.log(projects.getProjects())
      if(!(projects.checkIfValueIsInProject(projectTitle.value))){
        projects.addProjectToProjects(projectTitle.value)
        deleteContainerContent(dialog)
        loadProjects()
        dialog.close()
      }else{
        projectTitle.value = 'Input original value'
      }
      event.preventDefault()
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
    addTodoBtn.type = 'submit'
    const title = document.createElement('input')
    title.required = true
    const description = document.createElement('input')
    const dueDate = document.createElement('input')
    const form = document.createElement('form')
    dueDate.value = ToDo.getCurrentDay()
    dueDate.type = 'date'
    form.appendChild(title)
    form.appendChild(description)
    form.appendChild(dueDate)
    form.appendChild(addTodoBtn)
    dialog.appendChild(form)
    document.body.appendChild(dialog)
    dialog.showModal()
    form.addEventListener('submit',() => {
      projects.addToDoToProject(projects.currentProject(currentProject),title.value,description.value,dueDate.value)
      deleteContainerContent(dialog)
      loadTodos(projects.currentProject(currentProject))
      dialog.close()
    })
  }
  const init = () => {
    currentProject = 'Default'
    loadProjects()
    loadTodos(projects.getTodaysTodos())
    document.addEventListener('click', event => {
      let target = event.target
      if(projects.checkIfValueIsInProject(target.id)){
        currentProject = target.id
        loadTodos(projects.currentProject(currentProject))
      }
    })
  }
    return {init}
})()