import React from 'react';
import { TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard - Kierownik', icon: '📊' },
    { id: 'tasks' as TabType, label: 'Zadania', icon: '✅' },
    { id: 'users' as TabType, label: 'Użytkownicy', icon: '👥' },
    { id: 'products' as TabType, label: 'Produkt', icon: '📦' },
    { id: 'settings' as TabType, label: 'Ustawienia', icon: '⚙️' },
    { id: 'reports' as TabType, label: 'Raporty', icon: '📈' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {tabs.map((tab) => (
            <li 
              key={tab.id} 
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <button
                className="nav-link"
                onClick={() => onTabChange(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
