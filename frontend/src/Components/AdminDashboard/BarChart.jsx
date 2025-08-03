import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Training', 'Races', 'Ultramarathons', 'Cycling', 'Triathlon'],
        datasets: [
            {
                label: 'Participants',
                data: [3, 2, 3, 0, 0],
                backgroundColor: [
                    '#3f51b5',
                    '#2196f3',
                    '#4caf50',
                    '#ff9800',
                    '#f44336'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;

