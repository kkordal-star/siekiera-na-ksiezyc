import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../App';
import Confetti from 'react-confetti';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MainContentProps {
  activeTab: TabType;
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  responsibility: boolean;
  status: 'nowe' | 'w-trakcie' | 'zrobione';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, selectedTask, onTaskSelect }) => {
  const [tasks, setTasks] = useState<Task[]>([
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
      assignee: 'Katarzyna Dąbrowska',
      dueDate: '2024-02-18',
      tags: ['obsługa', 'szkolenia'],
      createdAt: '2024-01-23'
    }
  ]);

  // Customer opinions data for each task
  const customerOpinions = {
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

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [responsibilityFilter, setResponsibilityFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState('');



  const storeComparisonData = {
    labels: ['Warszawa Centrum', 'Kraków', 'Poznań', 'Wrocław', 'Gdańsk', 'Twój Sklep'],
    datasets: [
      {
        label: 'Pozytywny (%)',
        data: [65, 60, 55, 70, 68, 75],
        backgroundColor: '#3DAC19',
        stack: 'Stack 0',
      },
      {
        label: 'Neutralny (%)',
        data: [25, 30, 35, 20, 25, 20],
        backgroundColor: '#FFCC33',
        stack: 'Stack 0',
      },
      {
        label: 'Negatywny (%)',
        data: [10, 10, 10, 10, 7, 5],
        backgroundColor: '#F9062F',
        stack: 'Stack 0',
      },
    ],
  };

  const employeeQuotesData = [
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

  const customerSentimentData = {
    labels: ['Pozytywny', 'Neutralny', 'Negatywny'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          '#3DAC19',
          '#FFCC33',
          '#F9062F',
        ],
        borderColor: [
          '#3DAC19',
          '#FFCC33',
          '#F9062F',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sentimentByTagsData = {
    labels: ['Jakość', 'Obsługa', 'Ceny', 'Chrupkość bezy', 'Atmosfera'],
    datasets: [
      {
        label: 'Pozytywny (%)',
        data: [60, 50, 40, 55, 65],
        backgroundColor: '#3DAC19',
        stack: 'Stack 0',
      },
      {
        label: 'Neutralny (%)',
        data: [25, 30, 35, 25, 20],
        backgroundColor: '#FFCC33',
        stack: 'Stack 0',
      },
      {
        label: 'Negatywny (%)',
        data: [15, 20, 25, 20, 15],
        backgroundColor: '#F9062F',
        stack: 'Stack 0',
      },
    ],
  };

  const taskResolutionData = {
    labels: ['Rozwiązane', 'Nierozwiązane'],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ['#3DAC19', '#F9062F'],
        borderColor: ['#3DAC19', '#F9062F'],
        borderWidth: 1,
      },
    ],
  };

  const currentResponseRate = 28; // Aktualny Response Rate na dzisiaj

  const customerBasketValueData = {
    labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze'],
    datasets: [
      {
        label: 'Wartość koszyka (zł)',
        data: [45, 52, 48, 58, 62, 68],
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Trend w czasie',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Porównanie danych',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rozkład procentowy',
      },
    },
  };

  const handleResponsibilityChange = (taskId: string, newResponsibility: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, responsibility: newResponsibility } : task
    ));
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    // Show congratulations popup when task is completed
    if (newStatus === 'zrobione') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setCompletedTaskTitle(completedTask.title);
        setShowCongratulations(true);
        
        // Auto-hide the popup after 5 seconds
        setTimeout(() => {
          setShowCongratulations(false);
        }, 5000);
      }
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // Status filter
      if (statusFilter && task.status !== statusFilter) return false;
      
      // Priority filter
      if (priorityFilter && task.priority !== priorityFilter) return false;
      
      // Responsibility filter
      if (responsibilityFilter) {
        const taskResponsibility = task.responsibility ? 'true' : 'false';
        if (taskResponsibility !== responsibilityFilter) return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description.toLowerCase().includes(query);
        const matchesTags = task.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }
      
      return true;
    });
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'nowe': return 'bg-gray-200 text-gray-700';
      case 'w-trakcie': return 'bg-blue-200 text-blue-700';
      case 'zrobione': return 'bg-green-200 text-green-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'nowe': return 'Nowe';
      case 'w-trakcie': return 'W trakcie';
      case 'zrobione': return 'Zrobione';
      default: return 'Nieznany';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'Niska';
      case 'medium': return 'Średnia';
      case 'high': return 'Wysoka';
      case 'urgent': return 'Pilne';
      default: return 'Nieznana';
    }
  };

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

  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Task Resolution */}
        <div className="chart-card">
          <h3>Rozwiązanie Zadań</h3>
          <Doughnut data={taskResolutionData} options={pieChartOptions} />
        </div>

        {/* Customer Sentiment */}
        <div className="chart-card">
          <h3>Ogólny Sentyment Klientów</h3>
          <Pie data={customerSentimentData} options={pieChartOptions} />
        </div>

        {/* Sentiment by Tags */}
        <div className="chart-card">
          <h3>Sentyment w Podziale na Tagi</h3>
          <Bar data={sentimentByTagsData} options={barChartOptions} />
        </div>

        {/* Employee Quotes */}
        <div className="chart-card employee-quotes">
          <h3>Feedback o pracownikach</h3>
          <div className="quotes-container">
            {employeeQuotesData.map((employee, index) => (
              <div key={index} className={`quote-card ${employee.sentiment}`}>
                <div className="quote-header">
                  <h4>{employee.name}</h4>
                  <span className="role">{employee.role}</span>
                </div>
                <blockquote className="quote-text">
                  {employee.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Store Comparison */}
        <div className="chart-card">
          <h3>Porównanie z Innymi Filiami</h3>
          <Bar data={storeComparisonData} options={barChartOptions} />
        </div>

        {/* Response Rate */}
        <div className="chart-card">
          <h3>Response Rate</h3>
          <div className="calendar-card">
            <div className="calendar-header">
              <div className="calendar-month">GRUDZIEŃ</div>
              <div className="calendar-year">2024</div>
            </div>
            <div className="calendar-body">
              <div className="response-rate-value">{currentResponseRate}%</div>
              <div className="response-rate-label">Response Rate</div>
              <div className="response-rate-period">Za cały miesiąc</div>
            </div>
          </div>
        </div>

        {/* Customer Basket Value */}
        <div className="chart-card">
          <h3>Wartość Koszyka Klientów</h3>
          <Line data={customerBasketValueData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );

  const renderTaskDetail = () => {
    if (!selectedTask) return null;
    
    const task = tasks.find(t => t.id === selectedTask);
    if (!task) return null;
    
    const opinions = customerOpinions[selectedTask as keyof typeof customerOpinions] || [];
    
    return (
      <div className="task-detail-container">
        <div className="task-detail-header">
          <button 
            className="back-button"
            onClick={() => onTaskSelect('')}
          >
            ← Wróć do listy zadań
          </button>
          <div className="task-header-info">
            <h2>{task.title}</h2>
            <div className="task-meta">
              <span className={`status-badge ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
              <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="task-detail-content">
          <div className="task-info-section">
            <h3>Informacje o zadaniu</h3>
            <div className="task-info-grid">
              <div className="info-item">
                <label>Opis:</label>
                <p>{task.description}</p>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                  {getStatusLabel(task.status)}
                </span>
              </div>
              <div className="info-item">
                <label>Priorytet:</label>
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
              <div className="info-item">
                <label>Odpowiedzialny:</label>
                <p>{task.assignee}</p>
              </div>
              <div className="info-item">
                <label>Termin:</label>
                <p>{task.dueDate}</p>
              </div>
              <div className="info-item">
                <label>Tagi:</label>
                <div className="tags-container">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="customer-opinions-section">
            <h3>Opinie klientów</h3>
            <p className="opinions-description">
              Poniżej znajdują się opinie klientów, które doprowadziły do utworzenia tego zadania:
            </p>
            
            <div className="opinions-list">
              {opinions.map((opinion) => (
                <div key={opinion.id} className={`opinion-card ${opinion.sentiment}`}>
                  <div className="opinion-header">
                    <div className="customer-info">
                      <h4>{opinion.customerName}</h4>
                      <span className="opinion-date">{opinion.date}</span>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < opinion.rating ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="opinion-content">
                    <p>{opinion.comment}</p>
                  </div>
                  <div className="sentiment-badge">
                    {opinion.sentiment === 'positive' ? 'Pozytywna' : 
                     opinion.sentiment === 'negative' ? 'Negatywna' : 'Neutralna'}
                  </div>
                </div>
              ))}
            </div>
            
            {opinions.length === 0 && (
              <div className="no-opinions">
                <p>Brak opinii klientów dla tego zadania.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const content = getContent(activeTab);

  const renderTasksList = () => (
    <div className="tasks-container">
      <div className="tasks-header">
        <div className="tasks-filters">
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Wszystkie statusy</option>
            <option value="nowe">Nowe</option>
            <option value="w-trakcie">W trakcie</option>
            <option value="zrobione">Zrobione</option>
          </select>
          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Wszystkie priorytety</option>
            <option value="low">Niska</option>
            <option value="medium">Średnia</option>
            <option value="high">Wysoka</option>
            <option value="urgent">Pilne</option>
          </select>
          <select 
            className="filter-select"
            value={responsibilityFilter}
            onChange={(e) => setResponsibilityFilter(e.target.value)}
          >
            <option value="">Wszystkie odpowiedzialności</option>
            <option value="true">Moja odpowiedzialność</option>
            <option value="false">Nie moja odpowiedzialność</option>
          </select>
          <input 
            type="text" 
            placeholder="Szukaj zadań..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setStatusFilter('');
              setPriorityFilter('');
              setResponsibilityFilter('');
              setSearchQuery('');
            }}
            title="Wyczyść wszystkie filtry"
          >
            Wyczyść filtry
          </button>
        </div>
      </div>
      
      <div className="tasks-table">
        <table className="tasks-table-content">
          <thead>
            <tr>
              <th>Zadanie</th>
              <th>Moja odpowiedzialność</th>
              <th>Status</th>
              <th>Priorytet</th>
              <th>Tagi</th>
            </tr>
          </thead>
          
          <tbody>
            {getFilteredTasks().map((task) => (
              <tr 
                key={task.id} 
                className="task-row clickable"
                onClick={() => onTaskSelect(task.id)}
              >
                <td className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                <td>
                  <div className="responsibility-dropdown"
                       onClick={(e) => e.stopPropagation()}>
                    <select 
                      value={task.responsibility ? 'true' : 'false'}
                      onChange={(e) => handleResponsibilityChange(task.id, e.target.value === 'true')}
                      className="responsibility-select"
                    >
                      <option value="false">Nie</option>
                      <option value="true">Tak</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="status-dropdown"
                       onClick={(e) => e.stopPropagation()}>
                    <select 
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                      className="status-select"
                    >
                      <option value="nowe">Nowe</option>
                      <option value="w-trakcie">W trakcie</option>
                      <option value="zrobione">Zrobione</option>
                    </select>
                  </div>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </td>
                <td>
                  {task.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      
      {activeTab === 'dashboard' ? renderDashboard() : 
       activeTab === 'tasks' ? renderTasksList() : 
       activeTab === 'task-detail' ? renderTaskDetail() : (
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
