import React, { useState } from 'react';
import { TabType } from '../App';
import Confetti from 'react-confetti';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import TaskDetail from './TaskDetail';
import Placeholder from './Placeholder';
import { mockTasks, mockCustomerOpinions } from '../data/mockData';

interface MainContentProps {
  activeTab: TabType;
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, selectedTask, onTaskSelect }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState('');

  const getContent = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard - Kierownik',
          description: 'Kompleksowy przegląd kluczowych metryk i wskaźników wydajności sklepu.'
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
      case 'task-detail':
        return {
          title: 'Szczegóły zadania',
          description: 'Przegląd szczegółów zadania oraz opinie klientów, które doprowadziły do jego utworzenia.'
        };
      default:
        return {
          title: 'Witaj w panelu administracyjnym',
          description: 'Wybierz zakładkę z menu bocznego, aby rozpocząć pracę z systemem.'
        };
    }
  };

  const content = getContent(activeTab);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      
      {activeTab === 'dashboard' ? <Dashboard /> : 
       activeTab === 'tasks' ? <Tasks onTaskSelect={onTaskSelect} /> : 
       activeTab === 'task-detail' ? <TaskDetail 
         selectedTask={selectedTask}
         onTaskSelect={onTaskSelect}
         tasks={mockTasks}
         customerOpinions={mockCustomerOpinions}
       /> : 
       activeTab === 'users' ? <Placeholder title={content.title} description={content.description} /> :
       activeTab === 'products' ? <Placeholder title={content.title} description={content.description} /> :
       activeTab === 'settings' ? <Placeholder title={content.title} description={content.description} /> :
       activeTab === 'reports' ? <Placeholder title={content.title} description={content.description} /> : (
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
