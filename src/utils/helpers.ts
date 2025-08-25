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
    case 'low': return 'Niska';
    case 'medium': return 'Średnia';
    case 'high': return 'Wysoka';
    case 'urgent': return 'Pilne';
    default: return 'Nieznana';
  }
};
