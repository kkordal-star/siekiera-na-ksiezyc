import React from 'react';
import { TabType } from '../App';

interface MainContentProps {
  activeTab: TabType;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const getContent = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Widok główny panelu administracyjnego. Tutaj będą wyświetlane najważniejsze informacje.'
        };
      case 'users':
        return {
          title: 'Zarządzanie użytkownikami',
          description: 'Panel do zarządzania użytkownikami systemu. Lista, dodawanie, edycja i usuwanie.'
        };
      case 'products':
        return {
          title: 'Zarządzanie produktami',
          description: 'Panel do zarządzania produktami. Katalog, ceny, dostępność i inne parametry.'
        };
      case 'settings':
        return {
          title: 'Ustawienia systemu',
          description: 'Konfiguracja systemu, preferencje użytkownika i inne opcje.'
        };
      case 'reports':
        return {
          title: 'Raporty i statystyki',
          description: 'Generowanie raportów, analizy danych i statystyki systemu.'
        };
      default:
        return {
          title: 'Witaj w panelu administracyjnym',
          description: 'Wybierz zakładkę z menu bocznego, aby rozpocząć pracę.'
        };
    }
  };

  const content = getContent(activeTab);

  return (
    <main className="main-content">
      <div className="content-placeholder">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
    </main>
  );
};

export default MainContent;
