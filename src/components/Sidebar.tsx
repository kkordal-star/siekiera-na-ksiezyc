import React from 'react';
import { TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard' },
    { id: 'users' as TabType, label: 'Użytkownicy' },
    { id: 'products' as TabType, label: 'Produkty' },
    { id: 'settings' as TabType, label: 'Ustawienia' },
    { id: 'reports' as TabType, label: 'Raporty' },
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
