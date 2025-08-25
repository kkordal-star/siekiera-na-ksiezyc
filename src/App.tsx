import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export type TabType = 'dashboard' | 'tasks' | 'users' | 'products' | 'settings' | 'reports' | 'task-detail';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== 'task-detail') {
      setSelectedTask(null);
    }
  };

  const handleTaskSelect = (taskId: string) => {
    if (taskId === '') {
      setSelectedTask(null);
      setActiveTab('tasks');
    } else {
      setSelectedTask(taskId);
      setActiveTab('task-detail');
    }
  };

  return (
    <div className="admin-panel">
      <Header />
      <div className="main-container">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <MainContent 
          activeTab={activeTab} 
          selectedTask={selectedTask}
          onTaskSelect={handleTaskSelect}
        />
      </div>
    </div>
  );
}

export default App;
