import React, { useRef } from 'react';
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
  const tableRef = useRef<HTMLTableElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const rows = tableRef.current?.querySelectorAll('tbody tr');
      if (!rows) return;

      const currentElement = document.activeElement as HTMLElement;
      const currentRow = currentElement.closest('tr');
      if (!currentRow) return;

      const currentIndex = Array.from(rows).indexOf(currentRow);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowDown' && currentIndex < rows.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      const nextRow = rows[nextIndex];
      const firstFocusable = nextRow.querySelector('button, [tabindex]') as HTMLElement;
      firstFocusable?.focus();
    }
  };

  if (tasks.length === 0) {
    return <div className={styles.emptyMessage}>No hay tareas para mostrar</div>;
  }  

  return (
    <div 
      onKeyDown={handleKeyDown}
      role="region"
      tabIndex={-1}
      className={styles.tableContainer}>
      <table ref={tableRef} className={styles.taskTable}>
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
            />
          ))}
        </tbody>
      </table>

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
            />
        ))}
      </div>
    </div>
  );
};