import '../styles/style.css'
import { projects } from './projects'
projects.addProjectToProjects("Default")
projects.addProjectToProjects("Hello")
projects.addToDoToProject(projects.currentProject("Hello"),"title","description","dueDate","priority")
console.log(projects.getProjects())
