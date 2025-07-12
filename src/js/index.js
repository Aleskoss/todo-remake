import '../styles/style.css'
import { projects } from './projects'
import { dom } from './dom'
projects.addProjectToProjects("Default")
projects.addProjectToProjects("Hello")
projects.addToDoToProject(projects.currentProject("Default"),"title","description","dueDate","priority")
console.log(projects.getProjects())
dom.loadProjects()

