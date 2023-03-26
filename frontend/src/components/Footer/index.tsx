function getYear() {
    return new Date().getFullYear();
}

const Footer = () => {
    return (
        <footer className="border-t bg-white py-4">
            <div className="container mx-auto text-center text-gray-700">
                <p>&copy; {getYear()} Qard al-Hasan. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
