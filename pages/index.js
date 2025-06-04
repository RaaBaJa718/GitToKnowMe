import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-10">
                <h1 className="text-4xl font-bold">Welcome to GitToKnowMe</h1>
                <p className="mt-4 text-lg">Explore my journey through GitHub repositories</p>
                <ThemeToggle />
            </div>
            <Footer />
        </div>
    );
}