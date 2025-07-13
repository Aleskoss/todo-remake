import { projects } from "./projects"
export const dom = (() => {
  const projectsDiv = document.querySelector('#projects')
  const todosDiv = document.querySelector('#todos')
  const dialog = document.createElement('dialog')
  let currentProject = 'Default'
  const loadProjects = () => {
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
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      const description = document.createElement('input')
      description.type = 'text'
      description.value = `${projects.currentProject(project).todos[i].description}`
      const dueDate = document.createElement('input')
      dueDate.type = 'date'
      const title = document.createElement('input')
      title.type = 'title'
      title.value = projects.currentProject(project).todos[i].title
      const priority = document.createElement('input')
      priority.type = 'number'
      priority.max = 3
      priority.min = 1
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.id = projects.currentProject(project).todos[i].id
      deleteBtn.addEventListener('click',event => {
        todosDiv.removeChild(event.target.parentElement)
        projects.completeToDo(currentProject,event.target.id)
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
    dialog.appendChild(title)
    dialog.appendChild(description)
    dialog.appendChild(addTodoBtn)
    document.body.appendChild(dialog)
    dialog.showModal()
    addTodoBtn.addEventListener('click',() => {
      projects.addToDoToProject(projects.currentProject(currentProject),title.value,description.value,"dueDate","priority")
      deleteContainerContent(dialog)
      loadTodos(currentProject)
      dialog.close()
    })
  }
  const init = () => {
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