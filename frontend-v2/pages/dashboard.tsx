import { ReactNode } from 'react';
import DashboardLayout from '../src/Layouts/DashboardLayout';

const Dashboard = () => {
    return <div>Dashboard</div>;
};

Dashboard.getLayout = (page: ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
