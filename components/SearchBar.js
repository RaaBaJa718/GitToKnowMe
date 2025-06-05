import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
        >
            <input
                type="text"
                placeholder="Search repositories..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch(e.target.value);
                }}
                className="p-3 w-full border border-gray-300 rounded-md"
            />
        </motion.div>
    );
}