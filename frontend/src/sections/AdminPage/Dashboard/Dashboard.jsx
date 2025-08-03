import React, { useEffect, useState } from 'react';
import BarChart from '../../../Components/AdminDashboard/BarChart';

import c from './Dashboard.module.css';
import RevenueChart from '../../../Components/AdminDashboard/RevenueChart';

const Dashboard = () => {
    return (
        <>
            <section className={c.dashboard}>
                <div style={{ minHeight: '90vh', padding: '2rem' }}>
                    <h2>Event Participation Overview</h2>
                    <BarChart />
                </div>

                <div style={{ minHeight: '90vh', padding: '2rem' }}>
                    <h2 style={{ marginTop: '4rem' }}>Revenue Generated Per Event</h2>
                    <RevenueChart />
                </div>
            </section>
        </>
    );
};

export default Dashboard;



