import styles from './TaskView.module.css';
import { useState } from 'react';
import type { FilterType } from '../../../types/task';
import { useTasks } from '../../../hooks/useTasks';
import { TaskForm } from '../taskForm/TaskForm';
import { TaskList } from '../taskList/TaskList';

export const TasksView = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('Todo');
  const [editingId, setEditingId] = useState<string | null>(null);

  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completado') return task.completed;
    if (filter === 'Pendiente') return !task.completed;
    return true;
  });

  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const editTask = (id: string, newTitle: string) => {
    updateTask(id, { title: newTitle });
    setEditingId(null);
  };

  return (
    <div tabIndex={-1} className={styles.container}>
      {/*<h1 className={styles.title}>
        Administrador de Tareas
      </h1>*/}
      
      <TaskForm onAddTask={addTask} />
      
      <div className={styles.statsContainer}>
        <div className={styles.statsInfo}>
          <span className={styles.progressText}>
            Progreso: {completionPercentage}%
          </span>
          <span className={styles.totalText}>
            {completedTasks} de {totalTasks} tareas
          </span>
        </div>

        <div className={styles.filterButtons}>
          {(['Todo', 'Pendiente', 'Completado'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? `${styles.filterButton} ${styles.filterButtonActive}`
                  : `${styles.filterButton} ${styles.filterButtonInactive}`
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      
      {tasks.length === 0 && (
        <div className={styles.emptyMessage}>
          ¡Agrega tu primera tarea arriba!
        </div>
      )}
    </div>
  );
};