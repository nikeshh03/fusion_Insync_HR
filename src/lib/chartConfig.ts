import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  type ChartOptions
} from 'chart.js';

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
  Legend
);

// Shared chart options
export const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
};

export const pieChartOptions: ChartOptions = {
  ...defaultOptions,
  plugins: {
    ...defaultOptions.plugins,
    legend: {
      position: 'right' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
};