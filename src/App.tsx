import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export type TabType = 'dashboard' | 'tasks' | 'users' | 'products' | 'settings' | 'reports';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="admin-panel">
      <Header />
      <div className="main-container">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}

export default App;
