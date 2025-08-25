import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../types';
import { mockTasks } from '../data/mockData';
import { getStatusColor, getPriorityColor, getStatusLabel, getPriorityLabel } from '../utils/helpers';
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
        
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Auto-hide the popup after 5 seconds
        timeoutRef.current = setTimeout(() => {
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
                  }}
                >
                  Dziękuję! 😊
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;
