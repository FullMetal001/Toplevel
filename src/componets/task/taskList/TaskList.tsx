import React, { useRef, useEffect, useState } from 'react';
import type { Task } from '../../../types/task';
import { TaskItem } from '../taskItem/TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

export const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  setEditingId
}: TaskListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const selector = isMobile ? `.${styles.mobileItem}` : 'tr';
      const items = containerRef.current?.querySelectorAll(selector);
      
      if (!items || items.length === 0) return;

      const currentElement = document.activeElement as HTMLElement;
      const currentItem = currentElement.closest(isMobile ? `.${styles.mobileItem}` : 'tr');
      if (!currentItem) return;

      const currentIndex = Array.from(items).indexOf(currentItem);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      const nextItem = items[nextIndex];
      const firstFocusable = nextItem.querySelector(
        'button, input, [tabindex="0"]'
      ) as HTMLElement;
      firstFocusable?.focus();
    }
  };

  if (tasks.length === 0) {
    return <div className={styles.emptyMessage}>No hay tareas para mostrar</div>;
  }  

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="region"
      tabIndex={0}
      className={styles.tableContainer}>

        {isMobile ? (
          <div className={styles.mobileList}>
            {tasks.map(task => (
              <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  isEditing={editingId === task.id}
                  setEditing={() => setEditingId(task.id)}
                  cancelEditing={() => setEditingId(null)}
                  isMobile={true}
                />
            ))}
          </div>
        ) : (
          <table className={styles.taskTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader} scope="col">Nombre</th>
                <th className={styles.tableHeader} scope="col">Estado</th>
                <th className={styles.tableHeader} scope="col">Fecha de Inicio</th>
                <th className={styles.tableHeader} scope="col">Fecha de Culminación</th>
                <th className={styles.tableHeader} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  isEditing={editingId === task.id}
                  setEditing={() => setEditingId(task.id)}
                  cancelEditing={() => setEditingId(null)}
                  isMobile={false}
                />
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};