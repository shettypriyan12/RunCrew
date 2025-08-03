
import React from 'react';
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

const RevenueChart = () => {
    const data = {
        labels: ['Training', 'Races', 'Ultramarathons', 'Cycling', 'Triathlon'],
        datasets: [
            {
                label: 'Revenue (INR)',
                data: [14000, 10000, 4000, 0, 0],
                backgroundColor: '#00c853',
                borderColor: '#1b5e20',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20000,
                    callback: (value) => `₹${value}`,
                },
                title: {
                    display: true,
                    text: 'Revenue (INR)',
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

export default RevenueChart;
