import DashboardNavbar from '../../components/DashboardNavbar';

const DashboardLayout: React.FC<React.PropsWithChildren & { className?: string }> = ({ children, className = '' }) => {
    return (
        <main className={className}>
            <DashboardNavbar />
            {children}
        </main>
    );
};

export default DashboardLayout;
