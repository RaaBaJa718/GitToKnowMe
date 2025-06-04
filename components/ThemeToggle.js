import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <button 
            className="p-2 bg-gray-700 text-white rounded-md"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}