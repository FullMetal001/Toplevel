import styles from './Home.module.css';
import { TasksView } from '../../componets/task/taskView/TaskView'

function Home() {


  return (
    <>
      <div role="application" className={styles.mainContainer}> 
        <div role="banner" className={styles.topbarContainer}>
          <img 
              src="/topbar_image.webp"
              alt="Fondo decorativo"
              className={styles.topbarBackground}
          />
          <div className={styles.logoContainer}>            
            <img 
              src="/Logo_Topbar.avif" 
              alt="Logo de la aplicación" 
              className={styles.logo}
            />
          </div>
          <h1 className={styles.pageTitle}>ADMINISTRADOR DE TAREAS</h1>
        </div>
        <div role="main" id="main-content" className={styles.contentContainer}>
          <TasksView />
        </div>
        <footer role="contentinfo" className={styles.footer}>
          <p>© 2025 Toplevel Administrador de Tareas</p>
        </footer>
      </div>
    </>
  )
}

export default Home
