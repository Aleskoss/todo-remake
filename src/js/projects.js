import { ToDo } from "./todos"
export const projects = (() => {
  const project = []
  const getProjects = () => {
    return project
  }
  return {getProjects}
})()

class Project{
  constructor(title){
    this.title = title
    this.todos = []
  }
}

const adder = {
  addProjectToProjects(title){
    projects.getProjects().push(new Project(title))
  },
  addToDoToProject(project,title,description,dueDate,priority){
    project.todos.push(new ToDo(title,description,dueDate,priority))
  }
}

const searcher = {
  searchForProject(project){
    const indexOfProject = projects.getProjects().reduce((accumulator,value) => {
      if(value.title === project){
        accumulator = projects.getProjects().indexOf(value)
      }
      return accumulator
    },0)
    const currentOpenedProject = projects.getProjects()[indexOfProject]
    return currentOpenedProject
  }
}

Object.assign(projects,adder)
Object.assign(projects,searcher)