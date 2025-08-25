import React from 'react';
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

  return (
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
};

export default Dashboard;
