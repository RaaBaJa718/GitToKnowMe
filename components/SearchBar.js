import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    return (
        <div className="mb-6">
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
        </div>
    );
}