# Panel Administracyjny - React

Nowoczesny panel administracyjny stworzony w React z TypeScript.

## Funkcjonalności

- **Nagłówek** z miejscem na logo i tytułem
- **Panel boczny** z nawigacją (Dashboard, Użytkownicy, Produkty, Ustawienia, Raporty)
- **Główna zawartość** zmieniająca się w zależności od wybranej zakładki
- **Responsywny design** dostosowujący się do różnych rozmiarów ekranu
- **Nowoczesny wygląd** z gradientami i efektami hover
- **TypeScript** dla lepszej kontroli typów

## Struktura komponentów

- `App.tsx` - główny komponent aplikacji
- `Header.tsx` - komponent nagłówka z logo
- `Sidebar.tsx` - komponent bocznego panelu nawigacyjnego
- `MainContent.tsx` - komponent głównej zawartości

## Uruchomienie

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer deweloperski:
   ```bash
   npm start
   ```

3. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce

## Dostosowanie

### Zmiana logo
Zastąp tekst "LOGO" w komponencie `Header.tsx` swoim obrazkiem:

```tsx
<div className="logo">
  <img src="twoje-logo.png" alt="Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
</div>
```

### Dodawanie nowych zakładek
1. Dodaj nowy typ w `App.tsx` w `TabType`
2. Dodaj nową zakładkę w `Sidebar.tsx`
3. Dodaj odpowiednią treść w `MainContent.tsx`

### Zmiana kolorów
Edytuj zmienne CSS w pliku `App.css` lub dodaj CSS Variables.

## Technologie

- React 19
- TypeScript
- CSS3 (Flexbox, Grid, Animacje)
- Responsive Design
- Modern CSS Features (backdrop-filter, gradients)

## Skrypty dostępne

- `npm start` - uruchamia serwer deweloperski
- `npm run build` - buduje aplikację do produkcji
- `npm test` - uruchamia testy
- `npm run eject` - usuwa create-react-app (nieodwracalne)
- `npm run deploy` - wdraża aplikację na GitHub Pages

## Wdrażanie na GitHub Pages

### 1. Przygotowanie
Upewnij się, że masz zainstalowany pakiet `gh-pages`:
```bash
npm install --save-dev gh-pages
```

### 2. Konfiguracja
W `package.json` ustaw prawidłowy `homepage`:
```json
{
  "homepage": "https://twoja-nazwa-uzytkownika.github.io/nazwa-repozytorium"
}
```

### 3. Wdrożenie
```bash
npm run deploy
```

### 4. Konfiguracja GitHub
1. Przejdź do swojego repozytorium na GitHub
2. Kliknij **Settings** → **Pages**
3. W **Source** wybierz **Deploy from a branch**
4. W **Branch** wybierz **gh-pages** i **/(root)**
5. Kliknij **Save**

Po kilku minutach Twoja aplikacja będzie dostępna pod adresem z `homepage`!

## Przeglądarki

Panel jest kompatybilny z nowoczesnymi przeglądarkami:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
