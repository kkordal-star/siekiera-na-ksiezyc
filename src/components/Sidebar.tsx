import React from 'react';
import { TabType } from '../App';
import { 
  FiTrendingUp, 
  FiCheckSquare, 
  FiUsers, 
  FiPackage, 
  FiSettings, 
  FiBarChart2,
  FiSearch
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: IconType;
  hidden?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
          { id: 'dashboard', label: 'Dashboard', icon: FiTrendingUp },
    { id: 'tasks', label: 'Zadania', icon: FiCheckSquare },
    { id: 'users', label: 'Użytkownicy', icon: FiUsers },
    { id: 'products', label: 'Produkt', icon: FiPackage },
    { id: 'settings', label: 'Ustawienia', icon: FiSettings },
    { id: 'reports', label: 'Raporty', icon: FiBarChart2 },
    { id: 'task-detail', label: 'Szczegóły zadania', icon: FiSearch, hidden: true },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {tabs.filter(tab => !tab.hidden).map((tab) => (
            <li 
              key={tab.id} 
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <button
                className="nav-link"
                onClick={() => onTabChange(tab.id)}
              >
                <span className="nav-icon">
                  {React.createElement(tab.icon as React.ComponentType<any>, { size: 16 })}
                </span>
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
