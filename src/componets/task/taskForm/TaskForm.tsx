import styles from './TaskForm.module.css';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!addButtonRef.current) return;
    
    gsap.to(addButtonRef.current, {
      duration: 1.5,
      scale: 1.02,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

    const button = addButtonRef.current;  

    return () => {
      gsap.killTweensOf(button);
    };
  }, []);

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
          ref={addButtonRef}
        >
          Agregar
        </button>
      </div>
    </form>
  );
};