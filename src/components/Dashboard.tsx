import React, { useState } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
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
import { mockEmployeeQuotes } from '../data/mockData';

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

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'store' | 'manager'>('store');
  
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

  const employeeQuotesData = mockEmployeeQuotes;

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

  // Data for Manager - Personal view
  const personalTaskData = {
    labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze'],
    datasets: [
      {
        label: 'Wykonane zadania',
        data: [12, 18, 15, 22, 25, 28],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 2,
      },
    ],
  };

  const salesGrowthData = {
    labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze'],
    datasets: [
      {
        label: 'Wzrost sprzedaży (%)',
        data: [5, 8, 12, 15, 18, 22],
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const managerComparisonData = {
    labels: ['Ty', 'Zespół A', 'Zespół B', 'Zespół C', 'Zespół D'],
    datasets: [
      {
        label: 'Wykonane zadania',
        data: [28, 25, 30, 22, 26],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 2,
      },
      {
        label: 'Satyfakcja klientów (%)',
        data: [85, 78, 82, 75, 80],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 2,
      },
    ],
  };

  const personalMetricsData = {
    labels: ['Efektywność', 'Szybkość', 'Jakość', 'Komunikacja', 'Innowacyjność'],
    datasets: [
      {
        data: [85, 78, 92, 88, 75],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FF9800',
          '#9C27B0',
          '#F44336',
        ],
        borderColor: [
          '#388E3C',
          '#1976D2',
          '#F57C00',
          '#7B1FA2',
          '#D32F2F',
        ],
        borderWidth: 2,
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

  // Special options for personal tasks (no percentages, no stacking)
  const personalTasksBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ilość wykonanych zadań',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.parsed.y + ' zadań';
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + ' zadań';
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

  return (
    <div className="dashboard-container">
      {/* Dashboard View Switcher */}
      <div className="dashboard-switcher">
        <button
          className={`switcher-btn ${activeView === 'store' ? 'active' : ''}`}
          onClick={() => setActiveView('store')}
        >
          <span className="switcher-icon">
            {React.createElement(FiHome as React.ComponentType<any>, { size: 16 })}
          </span>
          <span className="switcher-text">Placówka</span>
        </button>
        <button
          className={`switcher-btn ${activeView === 'manager' ? 'active' : ''}`}
          onClick={() => setActiveView('manager')}
        >
          <span className="switcher-icon">
            {React.createElement(FiUser as React.ComponentType<any>, { size: 16 })}
          </span>
          <span className="switcher-text">Zespół</span>
        </button>
      </div>

              {activeView === 'store' ? (
        <div className="dashboard-grid">

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

        {/* Sales Growth - moved from Zespół */}
        <div className="chart-card">
          <h3>Wzrost Sprzedaży</h3>
          <Line data={salesGrowthData} options={lineChartOptions} />
        </div>
        </div>
      ) : (
        <div className="dashboard-grid">
          {/* Task Resolution - moved from Placówka */}
          <div className="chart-card">
            <h3>Rozwiązanie Zadań</h3>
            <Doughnut data={taskResolutionData} options={pieChartOptions} />
          </div>

          {/* Personal Task Performance */}
          <div className="chart-card">
            <h3>Wykonane Zadania</h3>
            <Bar data={personalTaskData} options={personalTasksBarOptions} />
          </div>

          {/* Employee Quotes - moved from Placówka */}
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



          {/* Manager Comparison */}
          <div className="chart-card">
            <h3>Porównanie z Innymi Zespołami</h3>
            <Bar data={managerComparisonData} options={barChartOptions} />
          </div>



          {/* Personal Stats Cards */}
          <div className="chart-card">
            <h3>Statystyki</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">28</div>
                <div className="stat-label">Wykonane zadania</div>
                <div className="stat-change positive">+12% vs miesiąc temu</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">85%</div>
                <div className="stat-label">Satyfakcja klientów</div>
                <div className="stat-change positive">+7% vs miesiąc temu</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">22%</div>
                <div className="stat-label">Wzrost sprzedaży</div>
                <div className="stat-change positive">+4% vs miesiąc temu</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">#2</div>
                <div className="stat-label">Ranking kierowników</div>
                <div className="stat-change neutral">Bez zmian</div>
              </div>
            </div>
          </div>

          {/* Personal Achievements */}
          <div className="chart-card">
            <h3>Osiągnięcia</h3>
            <div className="achievements-container">
              <div className="achievement-item">
                <span className="achievement-icon">🏆</span>
                <div className="achievement-content">
                  <h4>Najlepszy Kierownik Miesiąca</h4>
                  <p>Grudzień 2024 - za wzrost sprzedaży o 22%</p>
                </div>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon">⭐</span>
                <div className="achievement-content">
                  <h4>100% Rozwiązanych Zgłoszeń</h4>
                  <p>Wszystkie zadania ukończone w terminie</p>
                </div>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon">📈</span>
                <div className="achievement-content">
                  <h4>Rekordowa Satysfakcja Klientów</h4>
                  <p>85% pozytywnych opinii - najlepszy wynik w firmie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
