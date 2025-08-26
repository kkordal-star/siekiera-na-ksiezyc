import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../types';
import { mockTasks } from '../data/mockData';
import { getStatusColor, getPriorityColor, getStatusLabel, getPriorityLabel, sortTasksByPriority } from '../utils/helpers';
import Confetti from 'react-confetti';

interface TasksProps {
  onTaskSelect: (taskId: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ onTaskSelect }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [responsibilityFilter, setResponsibilityFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState<string>('');
  const [showPhoneNotification, setShowPhoneNotification] = useState(false);
  const [showResponsibilityModal, setShowResponsibilityModal] = useState(false);
  const [responsibilityReason, setResponsibilityReason] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const phoneTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (phoneTimeoutRef.current) {
        clearTimeout(phoneTimeoutRef.current);
      }
    };
  }, []);

  const handleResponsibilityChange = (taskId: string, newResponsibility: boolean | undefined) => {
    if (newResponsibility === undefined) {
      // Jeśli wybrano "Wybierz", ustaw undefined
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, responsibility: undefined } : task
      ));
    } else if (!newResponsibility) {
      // Jeśli ktoś zaznacza "nie", pokaż modal
      setCurrentTaskId(taskId);
      setShowResponsibilityModal(true);
    } else {
      // Jeśli zaznacza "tak", od razu zaktualizuj
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, responsibility: newResponsibility } : task
      ));
    }
  };

  const confirmResponsibilityDecline = () => {
    if (responsibilityReason.trim()) {
      // Zaktualizuj zadanie z powodem odmowy
      setTasks(tasks.map(task => 
        task.id === currentTaskId ? { 
          ...task, 
          responsibility: false,
          responsibilityReason: responsibilityReason.trim()
        } : task
      ));
      
      // Zamknij modal i wyczyść dane
      setShowResponsibilityModal(false);
      setResponsibilityReason('');
      setCurrentTaskId('');
    }
  };

  const cancelResponsibilityDecline = () => {
    // Zamknij modal i wyczyść dane bez zmiany
    setShowResponsibilityModal(false);
    setResponsibilityReason('');
    setCurrentTaskId('');
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
        
        // Clear any existing timeouts
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (phoneTimeoutRef.current) {
          clearTimeout(phoneTimeoutRef.current);
        }
        
        // Show phone notification after 3 seconds
        phoneTimeoutRef.current = setTimeout(() => {
          setShowPhoneNotification(true);
        }, 3000);
        
        // Auto-hide the congratulations popup after 5 seconds
        timeoutRef.current = setTimeout(() => {
          setShowCongratulations(false);
        }, 5000);
        
        // Auto-hide the phone notification after 8 seconds (3s delay + 5s display)
        phoneTimeoutRef.current = setTimeout(() => {
          setShowPhoneNotification(false);
        }, 8000);
      }
    }
  };

  const getFilteredTasks = () => {
    const filtered = tasks.filter(task => {
      // Status filter
      if (statusFilter && task.status !== statusFilter) return false;
      
      // Priority filter
      if (priorityFilter && task.priority !== priorityFilter) return false;
      
      // Responsibility filter
      if (responsibilityFilter) {
        if (responsibilityFilter === 'true' && !task.responsibility) return false;
        if (responsibilityFilter === 'false' && task.responsibility !== false) return false;
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

    // Sortowanie według priorytetów od najwyższego do najniższego
    return sortTasksByPriority(filtered);
  };



  return (
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
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
            <option value="urgent">Pilny</option>
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
              <tr 
                key={task.id} 
                className="task-row clickable"
                onClick={() => onTaskSelect(task.id)}
              >
                <td className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                <td>
                  <div className="responsibility-dropdown"
                       onClick={(e) => e.stopPropagation()}>
                    <select 
                      value={task.responsibility === undefined ? '' : (task.responsibility ? 'true' : 'false')}
                      onChange={(e) => {
                        if (e.target.value === '') {
                          handleResponsibilityChange(task.id, undefined);
                        } else {
                          handleResponsibilityChange(task.id, e.target.value === 'true');
                        }
                      }}
                      className="responsibility-select"
                    >
                      <option value="">Wybierz</option>
                      <option value="true">Tak</option>
                      <option value="false">Nie</option>
                    </select>
                  </div>
                  {task.responsibility === undefined && (
                    <div className="responsibility-status">Nie wybrano</div>
                  )}
                </td>
                <td>
                  <div className="status-dropdown"
                       onClick={(e) => e.stopPropagation()}>
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
                  onClick={() => {
                    setShowCongratulations(false);
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                    if (phoneTimeoutRef.current) {
                      clearTimeout(phoneTimeoutRef.current);
                      phoneTimeoutRef.current = null;
                    }
                  }}
                >
                  Dziękuję! 😊
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Responsibility Decline Modal */}
      {showResponsibilityModal && (
        <div className="modal-overlay">
          <div className="modal-content responsibility-modal">
            <div className="modal-header">
              <h3>Odmowa odpowiedzialności</h3>
              <button 
                className="modal-close"
                onClick={cancelResponsibilityDecline}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Proszę podać powód odmowy odpowiedzialności za to zadanie:</p>
              <textarea
                className="responsibility-reason-input"
                value={responsibilityReason}
                onChange={(e) => setResponsibilityReason(e.target.value)}
                placeholder="Wpisz powód odmowy odpowiedzialności..."
                rows={4}
              />
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-secondary"
                onClick={cancelResponsibilityDecline}
              >
                Anuluj
              </button>
              <button 
                className="modal-btn modal-btn-primary"
                onClick={confirmResponsibilityDecline}
                disabled={!responsibilityReason.trim()}
              >
                Potwierdź
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone with Push Notification */}
      {showPhoneNotification && (
        <div className="phone-notification-overlay">
          <div className="phone-container">
            <div className="phone">
              <div className="phone-header">
                <div className="phone-notch"></div>
                <div className="phone-time">14:32</div>
                <div className="phone-status">
                  <div className="battery"></div>
                  <div className="signal"></div>
                </div>
              </div>
              <div className="phone-screen">
                <div className="notification-banner">
                  <div className="notification-icon">🔔</div>
                  <div className="notification-content">
                    <div className="notification-title">Powiadomienie</div>
                    <div className="notification-text">
                      Uwagi z Twojego zgłoszenia zostały wzięte pod uwagę i naprawione
                    </div>
                    <div className="notification-time">Teraz</div>
                  </div>
                </div>
                <div className="phone-apps">
                  <div className="app-icon">📱</div>
                  <div className="app-icon">📧</div>
                  <div className="app-icon">🌐</div>
                  <div className="app-icon">⚙️</div>
                </div>
              </div>
              <div className="phone-home-button"></div>
            </div>
            <div className="phone-label">
              <p>Powiadomienie push zostało wysłane do klienta</p>
              <button 
                className="phone-close-btn"
                onClick={() => setShowPhoneNotification(false)}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
