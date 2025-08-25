import { Task } from '../types';

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'nowe': return 'bg-gray-200 text-gray-700';
    case 'w-trakcie': return 'bg-blue-200 text-blue-700';
    case 'zrobione': return 'bg-green-200 text-green-700';
    default: return 'bg-gray-200 text-gray-700';
  }
};

export const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'low': return 'bg-green-100 text-green-700';
    case 'medium': return 'bg-blue-100 text-blue-700';
    case 'high': return 'bg-orange-100 text-orange-700';
    case 'urgent': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getStatusLabel = (status: Task['status']) => {
  switch (status) {
    case 'nowe': return 'Nowe';
    case 'w-trakcie': return 'W trakcie';
    case 'zrobione': return 'Zrobione';
    default: return 'Nieznany';
  }
};

export const getPriorityLabel = (priority: Task['priority']) => {
  switch (priority) {
    case 'low': return 'Niski';
    case 'medium': return 'Średni';
    case 'high': return 'Wysoki';
    case 'urgent': return 'Pilny';
    default: return 'Nieznany';
  }
};

export const getPriorityOrder = (priority: Task['priority']) => {
  switch (priority) {
    case 'urgent': return 4;
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
};

export const sortTasksByPriority = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    const priorityA = getPriorityOrder(a.priority);
    const priorityB = getPriorityOrder(b.priority);
    return priorityB - priorityA; // Sortowanie malejąco (od najwyższego do najniższego)
  });
};
