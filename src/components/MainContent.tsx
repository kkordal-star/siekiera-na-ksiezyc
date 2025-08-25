import React, { useState } from 'react';
import { TabType } from '../App';

interface MainContentProps {
  activeTab: TabType;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Naprawa systemu zamawiania online',
      description: 'Klienci zgłaszają błędy podczas składania zamówień - system zawiesza się przy finalizacji płatności',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Jan Kowalski',
      dueDate: '2024-02-15',
      tags: ['system', 'płatności'],
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Poprawa jakości ciast w filii Warszawa Centrum',
      description: 'Wielu klientów skarży się na zbyt słodkie ciasta i nieświeże składniki w tej lokalizacji',
      status: 'todo',
      priority: 'medium',
      assignee: 'Anna Nowak',
      dueDate: '2024-02-20',
      tags: ['jakość', 'składniki'],
      createdAt: '2024-01-21'
    },
    {
      id: '3',
      title: 'Rozwiązanie problemu z dostawą',
      description: 'Dostawy do klientów biznesowych są spóźnione o 2-3 godziny, co powoduje reklamacje',
      status: 'review',
      priority: 'high',
      assignee: 'Piotr Wiśniewski',
      dueDate: '2024-02-10',
      tags: ['dostawa', 'logistyka'],
      createdAt: '2024-01-19'
    },
    {
      id: '4',
      title: 'Aktualizacja menu alergenów',
      description: 'Klienci z alergiami nie mogą znaleźć informacji o składnikach - menu jest nieaktualne',
      status: 'done',
      priority: 'low',
      assignee: 'Maria Zielińska',
      dueDate: '2024-01-30',
      tags: ['menu', 'alergeny'],
      createdAt: '2024-01-15'
    },
    {
      id: '5',
      title: 'Naprawa klimatyzacji w filii Kraków',
      description: 'W lokalu jest za gorąco, co powoduje psucie się ciast i dyskomfort klientów',
      status: 'todo',
      priority: 'urgent',
      assignee: 'Tomasz Lewandowski',
      dueDate: '2024-02-05',
      tags: ['infrastruktura', 'klimatyzacja'],
      createdAt: '2024-01-22'
    },
    {
      id: '6',
      title: 'Poprawa obsługi klienta',
      description: 'Pracownicy w filii Poznań są nieuprzejmi - klienci zgłaszają skargi na forum',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Katarzyna Dąbrowska',
      dueDate: '2024-02-18',
      tags: ['obsługa', 'szkolenia'],
      createdAt: '2024-01-23'
    }
  ]);

  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [editingPriority, setEditingPriority] = useState<string | null>(null);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setEditingStatus(null);
  };

  const handlePriorityChange = (taskId: string, newPriority: Task['priority']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
    setEditingPriority(null);
  };

  const toggleStatusEdit = (taskId: string) => {
    setEditingStatus(editingStatus === taskId ? null : taskId);
    setEditingPriority(null); // Close priority edit when opening status edit
  };

  const togglePriorityEdit = (taskId: string) => {
    setEditingPriority(editingPriority === taskId ? null : taskId);
    setEditingStatus(null); // Close status edit when opening priority edit
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-gray-200 text-gray-700';
      case 'in-progress': return 'bg-blue-200 text-blue-700';
      case 'review': return 'bg-yellow-200 text-yellow-700';
      case 'done': return 'bg-green-200 text-green-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600';
      case 'medium': return 'bg-blue-100 text-blue-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'urgent': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'Do zrobienia';
      case 'in-progress': return 'W trakcie';
      case 'review': return 'Do sprawdzenia';
      case 'done': return 'Zakończone';
      default: return 'Nieznany';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'Niska';
      case 'medium': return 'Średnia';
      case 'high': return 'Wysoka';
      case 'urgent': return 'Pilne';
      default: return 'Nieznana';
    }
  };

  const getContent = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Widok główny panelu administracyjnego. Tutaj będą wyświetlane najważniejsze informacje i statystyki.'
        };
      case 'tasks':
        return {
          title: 'Zarządzanie zadaniami',
          description: 'Panel do zarządzania zadaniami i projektami. Twórz, edytuj i śledź postęp prac.'
        };
      case 'users':
        return {
          title: 'Zarządzanie użytkownikami',
          description: 'Panel do zarządzania użytkownikami systemu. Lista, dodawanie, edycja i usuwanie kont użytkowników.'
        };
      case 'products':
        return {
          title: 'Zarządzanie produktami',
          description: 'Panel do zarządzania produktami. Katalog, ceny, dostępność i inne parametry produktów.'
        };
      case 'settings':
        return {
          title: 'Ustawienia systemu',
          description: 'Konfiguracja systemu, preferencje użytkownika i inne opcje konfiguracyjne.'
        };
      case 'reports':
        return {
          title: 'Raporty i statystyki',
          description: 'Generowanie raportów, analizy danych i statystyki systemu w czasie rzeczywistym.'
        };
      default:
        return {
          title: 'Witaj w panelu administracyjnym',
          description: 'Wybierz zakładkę z menu bocznego, aby rozpocząć pracę z systemem.'
        };
    }
  };

  const content = getContent(activeTab);

  const renderTasksList = () => (
    <div className="tasks-container">
      <div className="tasks-header">
        <div className="tasks-filters">
          <select className="filter-select">
            <option value="">Wszystkie statusy</option>
            <option value="todo">Do zrobienia</option>
            <option value="in-progress">W trakcie</option>
            <option value="review">Do sprawdzenia</option>
            <option value="done">Zakończone</option>
          </select>
          <select className="filter-select">
            <option value="">Wszystkie priorytety</option>
            <option value="low">Niska</option>
            <option value="medium">Średnia</option>
            <option value="high">Wysoka</option>
            <option value="urgent">Pilne</option>
          </select>
          <input 
            type="text" 
            placeholder="Szukaj zadań..." 
            className="search-input"
          />
        </div>
        <button className="add-task-btn">+ Nowe zadanie</button>
      </div>
      
      <div className="tasks-table">
        <table className="tasks-table-content">
          <thead>
            <tr>
              <th>Zadanie</th>
              <th>Status</th>
              <th>Priorytet</th>
              <th>Tagi</th>
            </tr>
          </thead>
          
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                <td>
                  {editingStatus === task.id ? (
                    <div className="status-dropdown">
                      <select 
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                        onBlur={() => setEditingStatus(null)}
                        autoFocus
                        className="status-select"
                      >
                        <option value="todo">Do zrobienia</option>
                        <option value="review">Do sprawdzenia</option>
                        <option value="in-progress">W trakcie</option>
                        <option value="done">Zakończone</option>
                      </select>
                    </div>
                  ) : (
                    <span 
                      className={`status-badge ${getStatusColor(task.status)} clickable`}
                      onClick={() => toggleStatusEdit(task.id)}
                      title="Kliknij aby zmienić status"
                    >
                      {getStatusLabel(task.status)}
                    </span>
                  )}
                </td>
                <td>
                  {editingPriority === task.id ? (
                    <div className="priority-dropdown">
                      <select 
                        value={task.priority}
                        onChange={(e) => handlePriorityChange(task.id, e.target.value as Task['priority'])}
                        onBlur={() => setEditingPriority(null)}
                        autoFocus
                        className="priority-select"
                      >
                        <option value="low">Niska</option>
                        <option value="medium">Średnia</option>
                        <option value="high">Wysoka</option>
                        <option value="urgent">Pilne</option>
                      </select>
                    </div>
                  ) : (
                    <span 
                      className={`priority-badge ${getPriorityColor(task.priority)} clickable`}
                      onClick={() => togglePriorityEdit(task.id)}
                      title="Kliknij aby zmienić priorytet"
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                  )}
                </td>
                <td>
                  {task.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      
      {activeTab === 'tasks' ? renderTasksList() : (
        <div className="content-placeholder">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
      )}
    </main>
  );
};

export default MainContent;
