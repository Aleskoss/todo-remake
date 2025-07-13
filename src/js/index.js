import '../styles/style.css'
import { projects } from './projects'
import { dom } from './dom'
import { setLocalStorage} from './local-storage'
if(projects.getProjects().length === 0){projects.addProjectToProjects("Default")}
dom.init()
window.addEventListener('beforeunload',(event) => {
  setLocalStorage('projects',projects.getProjects())
})

