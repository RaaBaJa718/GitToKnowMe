import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RepoCard from '../components/RepoCard';
import SearchBar from '../components/SearchBar';
import ThreeScene from '../components/ThreeScene';
import { getGitHubRepos } from '../lib/github';

export async function getServerSideProps() {
    const repos = await getGitHubRepos();
    return { props: { repos } };
}

export default function Projects({ repos }) {
    const [filteredRepos, setFilteredRepos] = useState(repos);

    const handleSearch = (query) => {
        const lowerQuery = query.toLowerCase();
        const filtered = repos.filter((repo) =>
            repo.name.toLowerCase().includes(lowerQuery) ||
            (repo.description && repo.description.toLowerCase().includes(lowerQuery))
        );
        setFilteredRepos(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar />
            <div className="p-10">
                <h1 className="text-3xl font-bold">My GitHub Projects</h1>
                <ThreeScene repos={repos} />
                <SearchBar onSearch={handleSearch} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredRepos.map(repo => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}