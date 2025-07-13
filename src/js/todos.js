import { projects } from "./projects"
export class ToDo{
  constructor(title,description,dueDate){
    this.checklist = false
    this.title = title
    this.description = description 
    this.dueDate = dueDate
    this.priority = 1
    this.id = crypto.randomUUID()
  }
}

const saver = {
  saveEditTodo(project,todo,todoEntity,value){
    const indexOfToDo = projects.currentToDoIndex(project,todo)
    projects.currentProject(project).todos[indexOfToDo][todoEntity] = value
  }
}

Object.assign(ToDo,saver)
