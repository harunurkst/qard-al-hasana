import DashboardNavbar from '../../components/DashboardNavbar';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main>
            <DashboardNavbar />
            {children}
        </main>
    );
};

export default DashboardLayout;
