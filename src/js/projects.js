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

const finder = {
  currentProject(project){
    const indexOfProject = projects.getProjects().reduce((accumulator,currentValue) => {
      if(currentValue.title === project){
        accumulator = projects.getProjects().indexOf(currentValue)
      }
      return accumulator
    },0)
    const currentOpenedProject = projects.getProjects()[indexOfProject]
    return currentOpenedProject
  },
  currentToDo(project,todo){
    indexOfTodo = projects.currentProject(project).todos.reduce((accumulator,currentValue) => {
      if(currentValue.id === todo){
        accumulator = projects.currentProject(project).todos.indexOf(currentValue)
      }
      return accumulator
    },0)
    const toDo = projects.currentProject(project).todos[indexOfTodo]
    return toDo
  }
}

const completer = {
  completeToDo(project,todo){
    const indexOfToDo = projects.currentProject(project).todos.indexOf(projects.currentProject(project).currentToDo(project,todo))
    projects.currentProject(project).todos.splice(indexOfToDo,1)
  }
}


Object.assign(projects,completer)
Object.assign(projects,adder)
Object.assign(projects,finder)