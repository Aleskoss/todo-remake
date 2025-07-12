import { projects } from "./projects"

export class ToDo{
  constructor(title,description,priority){
    this.checklist = ""
    this.title = title
    this.description = description 
    this.dueDate = ""
    this.priority = priority
    this.id = crypto.randomUUID()
  }
}

const completer = {
  removeToDo(project){
  }
}



