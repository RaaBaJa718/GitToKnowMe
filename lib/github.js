import axios from 'axios';

export async function getGitHubRepos() {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: { Authorization: `token ${token}` }
    });

    return response.data;
}