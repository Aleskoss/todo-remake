import { projects } from "./projects"
export class DOM{
  static loadProjects(){
    const projectsDiv = document.querySelector('#projects')
    const projectsLength = projects.getProjects().length
    for(let i = 0; i < projectsLength; i++){
      const para = document.createElement('p')
      para.textContent = projects.getProjects()[i].title
      projectsDiv.appendChild(para)
    }
  }
  static loadTodos(project){
    const todosDiv = document.querySelector('#todos')
    projects.currentProject(project).todos.title
  }
}