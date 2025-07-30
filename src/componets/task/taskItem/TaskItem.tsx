import { useState, useEffect, useRef } from 'react';
import type { Task } from '../../../types/task';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  isEditing: boolean;
  setEditing: () => void;
  cancelEditing: () => void;
  isMobile?: boolean;
}

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditing,
  cancelEditing,
  isMobile = false
}: TaskItemProps) => {
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim());
    } else {
      cancelEditing();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "EEEE, d 'de' MMMM 'de' y, h:mm a", { locale: es });
  };

   if (isMobile) {
    return (
      <>
        {/*mobile view*/}
        <tr tabIndex={-1} className={styles.mobileTaskItem}>           

          {/*checkbox*/}      
          <div className={styles.actions}>
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              onKeyDown={(e) => {
                handleKeyDown(e, () => onToggle(task.id));
                if (e.key === 'Tab' && e.shiftKey && !isEditing) {
                  e.preventDefault();
                  document.getElementById(`task-${task.id}-label`)?.focus();
                }
              }}
              className={styles.checkbox}
              tabIndex={0}
            />          
          </div>  

          {/*Nombre y fecha de creación*/}      
          <div className={styles.taskDetails}>
            <td role="cell" className={styles.tableCell}>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleEditSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSubmit();              
                  }}
                  className={styles.editInput}
                />
              ) : (
                <div className={styles.taskmobileContent}>
                  <span
                    id={`task-${task.id}-label`}
                    onClick={setEditing}
                    className={`${styles.taskName} ${task.completed ? styles.completed : ''}`}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e, setEditing)}
                    role="button"
                  >
                    {task.title}
                  </span>
                  <span className={styles.taskDate}>
                    Creado: {format(new Date(task.createdAt), "EEEE, d 'de' MMMM 'de' y, h:mm a", { locale: es })}
                  </span>
                </div>
              )}
            </td> 
          </div> 

          {/*boton de eliminar*/}    
          <div className={styles.actions}>
            <button
                ref={deleteBtnRef}
                onClick={() => onDelete(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab' && !e.shiftKey) {                
                    return;
                  }
                  if (e.key === 'Tab' && e.shiftKey) {
                    e.preventDefault();
                    checkboxRef.current?.focus();
                  }
                  handleKeyDown(e, () => onDelete(task.id));
                }}
                className={styles.deleteButton}
                tabIndex={0}            
              >
                ✕
              </button>
          </div>
        </tr>
      </>
    );
  }

  return (
    <>
    <tr tabIndex={-1} className={styles.tableRow}>
      <td role="cell" className={styles.tableCell}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSubmit();
              if (e.key === 'Escape') cancelEditing();
              if (e.key === 'Tab' && !e.shiftKey && deleteBtnRef.current) {
                e.preventDefault();
                deleteBtnRef.current.focus();
              }
            }}
            className={styles.editInput}
          />
        ) : (
          <span
            id={`task-${task.id}-label`}
            onClick={setEditing}
            className={`${styles.taskName} ${task.completed ? styles.completed : ''}`}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, setEditing)}
            role="button"
          >
            {task.title}
          </span>
        )}
      </td>
      
      <td role="cell" id={`task-${task.id}-status`} className={styles.tableCell}>
        <span className={task.completed ? styles.statusCompleted : styles.statusPending}>
          {task.completed ? 'Completado' : 'Pendiente'}
        </span>
      </td>
      
      <td role="cell" className={styles.tableCell}>
        {formatDate(new Date(task.createdAt))}
      </td>
      
      <td role="cell" className={styles.tableCell}>
        {task.completedAt ? formatDate(new Date(task.completedAt)) : '-'}
      </td>
      
      <td role="cell" className={styles.tableCell}>
        <div className={styles.actions}>
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            onKeyDown={(e) => {
              handleKeyDown(e, () => onToggle(task.id));
              if (e.key === 'Tab' && e.shiftKey && !isEditing) {
                e.preventDefault();
                document.getElementById(`task-${task.id}-label`)?.focus();
              }
            }}
            className={styles.checkbox}
            tabIndex={0}
          />
          <button
            ref={deleteBtnRef}
            onClick={() => onDelete(task.id)}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey) {                
                return;
              }
              if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                checkboxRef.current?.focus();
              }
              handleKeyDown(e, () => onDelete(task.id));
            }}
            className={styles.deleteButton}
            tabIndex={0}            
          >
            ✕
          </button>
        </div>
      </td>
    </tr>           
    </>
  );
};