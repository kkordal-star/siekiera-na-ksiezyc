# Admin Panel React

Nowoczesny panel administracyjny zbudowany w React i TypeScript.

## Funkcjonalności

### Dashboard
- Widok główny z najważniejszymi informacjami i statystykami

### Zarządzanie zadaniami (Tasks)
- Lista zadań z możliwością filtrowania i wyszukiwania
- Statusy zadań: Do zrobienia, W trakcie, Do sprawdzenia, Zakończone
- Poziomy priorytetów: Niska, Średnia, Wysoka, Pilne
- Przypisywanie zadań do użytkowników
- System tagów dla lepszej organizacji
- Terminy realizacji zadań
- Akcje: Edytuj i Usuń

### Zarządzanie użytkownikami
- Lista użytkowników systemu
- Dodawanie, edycja i usuwanie kont

### Zarządzanie produktami
- Katalog produktów
- Ceny i dostępność
- Parametry produktów

### Ustawienia systemu
- Konfiguracja systemu
- Preferencje użytkownika

### Raporty i statystyki
- Generowanie raportów
- Analizy danych w czasie rzeczywistym

## Technologie

- React 18
- TypeScript
- CSS3 z Grid i Flexbox
- Responsywny design

## Uruchomienie

```bash
npm install
npm start
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Struktura projektu

```
src/
├── components/
│   ├── Header.tsx          # Nagłówek aplikacji
│   ├── Sidebar.tsx         # Menu boczne z nawigacją
│   └── MainContent.tsx     # Główna zawartość z zarządzaniem zadaniami
├── App.tsx                 # Główny komponent aplikacji
└── App.css                 # Style CSS
```

## Layout zadań (ClickUp-style)

Interfejs zarządzania zadaniami został zaprojektowany w stylu ClickUp z:
- Tabelą zadań z kolumnami: Zadanie, Status, Priorytet, Przypisane do, Termin, Tagi, Akcje
- Filtrami po statusie i priorytecie
- Wyszukiwarką zadań
- Przyciskiem dodawania nowych zadań
- Kolorowymi oznaczeniami statusów i priorytetów
- Responsywnym designem
