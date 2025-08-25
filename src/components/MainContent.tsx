import React, { useState } from 'react';
import { TabType } from '../App';
import Confetti from 'react-confetti';

interface MainContentProps {
  activeTab: TabType;
}

interface Task {
  id: string;
  title: string;
  description: string;
  responsibility: boolean;
  status: 'nowe' | 'w-trakcie' | 'zrobione';
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
      responsibility: false,
      status: 'w-trakcie',
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
      responsibility: false,
      status: 'nowe',
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
      responsibility: false,
      status: 'zrobione',
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
      responsibility: false,
      status: 'zrobione',
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
      responsibility: false,
      status: 'nowe',
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
      responsibility: false,
      status: 'w-trakcie',
      priority: 'high',
      assignee: 'Katarzyna Dąbrowska',
      dueDate: '2024-02-18',
      tags: ['obsługa', 'szkolenia'],
      createdAt: '2024-01-23'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [responsibilityFilter, setResponsibilityFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState('');

  const handleResponsibilityChange = (taskId: string, newResponsibility: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, responsibility: newResponsibility } : task
    ));
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    // Show congratulations popup when task is completed
    if (newStatus === 'zrobione') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setCompletedTaskTitle(completedTask.title);
        setShowCongratulations(true);
        
        // Auto-hide the popup after 5 seconds
        setTimeout(() => {
          setShowCongratulations(false);
        }, 5000);
      }
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // Status filter
      if (statusFilter && task.status !== statusFilter) return false;
      
      // Priority filter
      if (priorityFilter && task.priority !== priorityFilter) return false;
      
      // Responsibility filter
      if (responsibilityFilter) {
        const taskResponsibility = task.responsibility ? 'true' : 'false';
        if (taskResponsibility !== responsibilityFilter) return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description.toLowerCase().includes(query);
        const matchesTags = task.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }
      
      return true;
    });
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'nowe': return 'bg-gray-200 text-gray-700';
      case 'w-trakcie': return 'bg-blue-200 text-blue-700';
      case 'zrobione': return 'bg-green-200 text-green-700';
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
      case 'nowe': return 'Nowe';
      case 'w-trakcie': return 'W trakcie';
      case 'zrobione': return 'Zrobione';
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
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Wszystkie statusy</option>
            <option value="nowe">Nowe</option>
            <option value="w-trakcie">W trakcie</option>
            <option value="zrobione">Zrobione</option>
          </select>
          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Wszystkie priorytety</option>
            <option value="low">Niska</option>
            <option value="medium">Średnia</option>
            <option value="high">Wysoka</option>
            <option value="urgent">Pilne</option>
          </select>
          <select 
            className="filter-select"
            value={responsibilityFilter}
            onChange={(e) => setResponsibilityFilter(e.target.value)}
          >
            <option value="">Wszystkie odpowiedzialności</option>
            <option value="true">Moja odpowiedzialność</option>
            <option value="false">Nie moja odpowiedzialność</option>
          </select>
          <input 
            type="text" 
            placeholder="Szukaj zadań..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setStatusFilter('');
              setPriorityFilter('');
              setResponsibilityFilter('');
              setSearchQuery('');
            }}
            title="Wyczyść wszystkie filtry"
          >
            Wyczyść filtry
          </button>
        </div>
      </div>
      
      <div className="tasks-table">
        <table className="tasks-table-content">
          <thead>
            <tr>
              <th>Zadanie</th>
              <th>Moja odpowiedzialność</th>
              <th>Status</th>
              <th>Priorytet</th>
              <th>Tagi</th>
            </tr>
          </thead>
          
          <tbody>
            {getFilteredTasks().map((task) => (
              <tr key={task.id}>
                <td className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                <td>
                  <div className="responsibility-dropdown">
                    <select 
                      value={task.responsibility ? 'true' : 'false'}
                      onChange={(e) => handleResponsibilityChange(task.id, e.target.value === 'true')}
                      className="responsibility-select"
                    >
                      <option value="false">Nie</option>
                      <option value="true">Tak</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="status-dropdown">
                    <select 
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                      className="status-select"
                    >
                      <option value="nowe">Nowe</option>
                      <option value="w-trakcie">W trakcie</option>
                      <option value="zrobione">Zrobione</option>
                    </select>
                  </div>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
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

      {/* Congratulations Popup with Confetti */}
      {showCongratulations && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
          />
          <div className="congratulations-overlay">
            <div className="congratulations-popup">
              <div className="congratulations-content">
                <div className="congratulations-icon">🎉</div>
                <h2>Gratulacje! 🎊</h2>
                <p>Jesteś bohaterem klienta!</p>
                <div className="completed-task">
                  <strong>Ukończone zadanie:</strong>
                  <p>{completedTaskTitle}</p>
                </div>
                <button 
                  className="congratulations-close"
                  onClick={() => setShowCongratulations(false)}
                >
                  Dziękuję! 😊
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default MainContent;
