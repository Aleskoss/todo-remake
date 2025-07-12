import '../styles/style.css'
import { ToDo } from './todos'
import { Project, projects } from './projects'
projects.addProjectToProjects("Default")
projects.addProjectToProjects("Hello")
projects.addToDoToProject(projects.searchForProject("Hello"),"title","description","dueDate","priority")
console.log(projects.searchForProject("Hello"))
