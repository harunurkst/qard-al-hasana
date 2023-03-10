import { ReactNode } from 'react';
import DashboardLayout from '../src/Layouts/DashboardLayout';
import Analytics from '../src/modules/dashboard/components/Analytics';

const Dashboard = () => {
    return (
        <div className="container mx-auto">
            <Analytics />
        </div>
    );
};

Dashboard.getLayout = (page: ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
