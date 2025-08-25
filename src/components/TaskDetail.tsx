import React from 'react';
import { Task, CustomerOpinion } from '../types';
import { getStatusColor, getPriorityColor, getStatusLabel, getPriorityLabel } from '../utils/helpers';

interface TaskDetailProps {
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
  tasks: Task[];
  customerOpinions: Record<string, CustomerOpinion[]>;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ 
  selectedTask, 
  onTaskSelect, 
  tasks, 
  customerOpinions 
}) => {
  if (!selectedTask) return null;
  
  const task = tasks.find(t => t.id === selectedTask);
  if (!task) return null;
  
  const opinions = customerOpinions[selectedTask] || [];
  

  
  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <button 
          className="back-button"
          onClick={() => onTaskSelect('')}
        >
          ← Wróć do listy zadań
        </button>
        <div className="task-header-info">
          <h2>{task.title}</h2>
          <div className="task-meta">
            <span className={`status-badge ${getStatusColor(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
            <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="task-detail-content">
        <div className="task-info-section">
          <h3>Informacje o zadaniu</h3>
          <div className="task-info-grid">
            <div className="info-item">
              <label>Opis:</label>
              <p>{task.description}</p>
            </div>
            <div className="info-item">
              <label>Status:</label>
              <span className={`status-badge ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            </div>
            <div className="info-item">
              <label>Priorytet:</label>
              <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>
            <div className="info-item">
              <label>Odpowiedzialny:</label>
              <p>{task.assignee}</p>
            </div>
            <div className="info-item">
              <label>Termin:</label>
              <p>{task.dueDate}</p>
            </div>
            <div className="info-item">
              <label>Tagi:</label>
              <div className="tags-container">
                {task.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="customer-opinions-section">
          <h3>Opinie klientów</h3>
          <p className="opinions-description">
            Poniżej znajdują się opinie klientów, które doprowadziły do utworzenia tego zadania:
          </p>
          
          <div className="opinions-list">
            {opinions.map((opinion) => (
              <div key={opinion.id} className={`opinion-card ${opinion.sentiment}`}>
                <div className="opinion-header">
                  <div className="customer-info">
                    <h4>{opinion.customerName}</h4>
                    <span className="opinion-date">{opinion.date}</span>
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < opinion.rating ? 'filled' : ''}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="opinion-content">
                  <p>{opinion.comment}</p>
                </div>
                <div className="sentiment-badge">
                  {opinion.sentiment === 'positive' ? 'Pozytywna' : 
                   opinion.sentiment === 'negative' ? 'Negatywna' : 'Neutralna'}
                </div>
              </div>
            ))}
          </div>
          
          {opinions.length === 0 && (
            <div className="no-opinions">
              <p>Brak opinii klientów dla tego zadania.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
