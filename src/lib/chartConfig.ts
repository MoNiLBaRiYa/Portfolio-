import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  BarController,
  RadarController,
  DoughnutController,
  PieController,
} from 'chart.js';

// Register all Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  BarController,
  RadarController,
  DoughnutController,
  PieController
);

export { ChartJS };
