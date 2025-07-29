export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type FilterType = 'Todo' | 'Completado' | 'Pendiente';