import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const BaseLayout: React.FC<React.PropsWithChildren & { className?: string }> = ({ children, className = '' }) => {
    return (
        <div className={className}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default BaseLayout;
