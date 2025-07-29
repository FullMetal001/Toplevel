import styles from './TaskForm.module.css';
import { useState } from 'react';


interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} role="form" className={styles.form}>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Agregar una nueva tarea..."
          className={styles.input}         
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!inputValue.trim()}
        >
          Agregar
        </button>
      </div>
    </form>
  );
};