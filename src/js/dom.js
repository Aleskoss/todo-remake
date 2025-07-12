import { projects } from "./projects"
export const dom = (() => {
  const projectsDiv = document.querySelector('#projects')
  const todosDiv = document.querySelector('#todos')
  const dialog = document.createElement('dialog')
  const loadProjects = () => {
    const projectsLength = projects.getProjects().length
    for(let i = 0; i < projectsLength; i++){
      const para = document.createElement('p')
      para.textContent = projects.getProjects()[i].title
      projectsDiv.appendChild(para)
    }
    addProjectBtn()
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
    const projectTitle = document.createElement('input')
    dialog.appendChild(addProjectBtn)
    dialog.appendChild(projectTitle)
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
  }
    return {loadProjects,loadTodos,addProjectBtn}
})()