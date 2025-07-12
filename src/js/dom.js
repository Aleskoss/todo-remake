import { projects } from "./projects"
export const dom = (() => {
  const projectsDiv = document.querySelector('#projects')
  const todosDiv = document.querySelector('#todos')
  const dialog = document.createElement('dialog')
  const loadProjects = (project) => {
    const projectsLength = projects.getProjects().length
    for(let i = 0; i < projectsLength; i++){
      const para = document.createElement('p')
      para.textContent = projects.getProjects()[i].title
      projectsDiv.appendChild(para)
    }
    addProjectBtn()
    addTodoBtn()
  }
  const loadTodos = (project) => {
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
  const addTodoBtn = (project) => {
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
      projects.addToDoToProject(projects.currentProject("Default"),title,description,"dueDate","priority")
      deleteContainerContent(dialog)
      dialog.close()
    })
  }
    return {loadProjects,loadTodos,addProjectBtn}
})()