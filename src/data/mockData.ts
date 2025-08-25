import { Task, CustomerOpinion, EmployeeQuote } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Naprawa systemu zamawiania online',
    description: 'Klienci zgłaszają błędy podczas składania zamówień - system zawiesza się przy finalizacji płatności',
    responsibility: false,
    status: 'w-trakcie',
    priority: 'high',
    assignee: 'Jan Kowalski',
    dueDate: '2024-02-15',
    tags: ['system', 'płatności'],
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Poprawa jakości ciast w filii Warszawa Centrum',
    description: 'Wielu klientów skarży się na zbyt słodkie ciasta i nieświeże składniki w tej lokalizacji',
    responsibility: false,
    status: 'nowe',
    priority: 'medium',
    assignee: 'Anna Nowak',
    dueDate: '2024-02-20',
    tags: ['jakość', 'składniki'],
    createdAt: '2024-01-21'
  },
  {
    id: '3',
    title: 'Rozwiązanie problemu z dostawą',
    description: 'Dostawy do klientów biznesowych są spóźnione o 2-3 godziny, co powoduje reklamacje',
    responsibility: false,
    status: 'zrobione',
    priority: 'high',
    assignee: 'Piotr Wiśniewski',
    dueDate: '2024-02-10',
    tags: ['dostawa', 'logistyka'],
    createdAt: '2024-01-19'
  },
  {
    id: '4',
    title: 'Aktualizacja menu alergenów',
    description: 'Klienci z alergiami nie mogą znaleźć informacji o składnikach - menu jest nieaktualne',
    responsibility: false,
    status: 'zrobione',
    priority: 'low',
    assignee: 'Maria Zielińska',
    dueDate: '2024-01-30',
    tags: ['menu', 'alergeny'],
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    title: 'Naprawa klimatyzacji w filii Kraków',
    description: 'W lokalu jest za gorąco, co powoduje psucie się ciast i dyskomfort klientów',
    responsibility: false,
    status: 'nowe',
    priority: 'urgent',
    assignee: 'Tomasz Lewandowski',
    dueDate: '2024-02-05',
    tags: ['infrastruktura', 'klimatyzacja'],
    createdAt: '2024-01-22'
  },
  {
    id: '6',
    title: 'Poprawa obsługi klienta',
    description: 'Pracownicy w filii Poznań są nieuprzejmi - klienci zgłaszają skargi na forum',
    responsibility: false,
    status: 'w-trakcie',
    priority: 'high',
    assignee: 'Anna Nowak',
    dueDate: '2024-02-18',
    tags: ['obsługa', 'szkolenia'],
    createdAt: '2024-01-23'
  }
];

export const mockCustomerOpinions: Record<string, CustomerOpinion[]> = {
  '1': [
    {
      id: '1',
      customerName: 'Marek Kowalczyk',
      rating: 2,
      comment: 'System zawiesza się przy płatności. Próbowałem 3 razy i za każdym razem to samo. Bardzo frustrujące!',
      date: '2024-01-18',
      sentiment: 'negative'
    },
    {
      id: '2',
      customerName: 'Anna Wiśniewska',
      rating: 1,
      comment: 'Nie mogę dokończyć zamówienia. System się zawiesza przy wyborze metody płatności. Proszę o naprawę!',
      date: '2024-01-19',
      sentiment: 'negative'
    },
    {
      id: '3',
      customerName: 'Piotr Nowak',
      rating: 2,
      comment: 'Próbowałem zamówić ciasto online, ale system nie działa. Szkoda, bo chciałem zrobić niespodziankę żonie.',
      date: '2024-01-20',
      sentiment: 'negative'
    }
  ],
  '2': [
    {
      id: '4',
      customerName: 'Katarzyna Zielińska',
      rating: 2,
      comment: 'Ciasta są za słodkie i mają dziwny smak. Nie polecam tej filii.',
      date: '2024-01-20',
      sentiment: 'negative'
    },
    {
      id: '5',
      customerName: 'Tomasz Lewandowski',
      rating: 1,
      comment: 'Składniki wyglądają na nieświeże. Smak jest okropny. Proszę o kontrolę jakości.',
      date: '2024-01-21',
      sentiment: 'negative'
    },
    {
      id: '6',
      customerName: 'Maria Dąbrowska',
      rating: 3,
      comment: 'Ciasta są średnie. Mogłyby być lepsze za taką cenę.',
      date: '2024-01-22',
      sentiment: 'neutral'
    }
  ],
  '3': [
    {
      id: '7',
      customerName: 'Jan Kowalczyk',
      rating: 2,
      comment: 'Dostawa spóźniona o 3 godziny. Klient był bardzo niezadowolony.',
      date: '2024-01-18',
      sentiment: 'negative'
    },
    {
      id: '8',
      customerName: 'Agnieszka Wiśniewska',
      rating: 1,
      comment: 'Spóźnienie o 2 godziny. To nieprofesjonalne podejście.',
      date: '2024-01-19',
      sentiment: 'negative'
    }
  ],
  '4': [
    {
      id: '9',
      customerName: 'Ewa Nowak',
      rating: 2,
      comment: 'Nie ma informacji o alergenach. Jako alergik nie mogę bezpiecznie zamówić.',
      date: '2024-01-14',
      sentiment: 'negative'
    },
    {
      id: '10',
      customerName: 'Michał Zieliński',
      rating: 3,
      comment: 'Menu jest nieaktualne. Brakuje informacji o składnikach.',
      date: '2024-01-15',
      sentiment: 'neutral'
    }
  ],
  '5': [
    {
      id: '11',
      customerName: 'Karolina Lewandowska',
      rating: 1,
      comment: 'W lokalu jest za gorąco. Ciasta się psują, a klienci są niezadowoleni.',
      date: '2024-01-21',
      sentiment: 'negative'
    },
    {
      id: '12',
      customerName: 'Adam Dąbrowski',
      rating: 2,
      comment: 'Temperatura w lokalu jest nieodpowiednia. Trudno tam przebywać.',
      date: '2024-01-22',
      sentiment: 'negative'
    }
  ],
  '6': [
    {
      id: '13',
      customerName: 'Natalia Kowalska',
      rating: 1,
      comment: 'Pracownicy są nieuprzejmi i niechętni do pomocy.',
      date: '2024-01-22',
      sentiment: 'negative'
    },
    {
      id: '14',
      customerName: 'Łukasz Wiśniewski',
      rating: 2,
      comment: 'Obsługa klienta pozostawia wiele do życzenia. Szkoda, bo ciasta są dobre.',
      date: '2024-01-23',
      sentiment: 'negative'
    }
  ]
};

export const mockEmployeeQuotes: EmployeeQuote[] = [
  {
    name: 'Anna Kowalska',
    role: 'Kierownik sklepu',
    quote: '"Pani Anna jest po prostu wspaniała! Zawsze znajdzie czas, żeby pomóc i doradzić. Dziękuję za świetną obsługę!"',
    sentiment: 'positive'
  },
  {
    name: 'Piotr Wiśniewski',
    role: 'Sprzedawca',
    quote: '"Pan Piotr jest bardzo miły i pomocny, ale ostatnio pomylił moje zamówienie. Mimo to, nadal go lubię."',
    sentiment: 'mixed'
  },
  {
    name: 'Maria Nowak',
    role: 'Kasjerka',
    quote: '"Maria to najlepsza kasjerka jaką kiedykolwiek spotkałem! Zawsze uśmiechnięta i cierpliwa. 10/10!"',
    sentiment: 'positive'
  },
  {
    name: 'Tomasz Lewandowski',
    role: 'Magazynier',
    quote: '"Tomasz jest bardzo nieuprzejmy. Kiedy pytam o produkty, robi minę jakbym mu przeszkadzał. Nie polecam."',
    sentiment: 'negative'
  },
  {
    name: 'Katarzyna Dąbrowska',
    role: 'Sprzedawca',
    quote: '"Kasia to skarb! Pomogła mi wybrać idealny prezent dla mamy. Jestem zachwycona jej wiedzą i uprzejmością."',
    sentiment: 'positive'
  },
  {
    name: 'Jan Zieliński',
    role: 'Kierownik zmiany',
    quote: '"Jan jest dobry w organizacji pracy, ale czasem bywa zbyt szorstki. Może być miły, ale nie zawsze."',
    sentiment: 'mixed'
  }
];
