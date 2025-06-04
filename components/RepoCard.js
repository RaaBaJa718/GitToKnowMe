export default function RepoCard({ repo }) {
    return (
        <div className="border p-4 rounded-md shadow-md bg-white">
            <h2 className="text-lg font-bold">{repo.name}</h2>
            <p>{repo.description}</p>
            <div className="text-sm text-gray-500">⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View on GitHub</a>
        </div>
    );
}