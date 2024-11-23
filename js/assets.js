document.addEventListener('DOMContentLoaded', () => {
    const repo = 'paul-hartwich/paul-hartwich.github.io';
    const directories = ['css', 'icon', 'js', 'media', 'json'];

    const fetchDirectoryContents = async (dir) => {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${dir}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${dir} contents`);
        }
        return response.json();
    };

    const displayContents = async () => {
        const container = document.getElementById('directory-contents');
        const excludePrefixes = ['pages', 'assets'];

        for (const dir of directories) {
            try {
                const files = await fetchDirectoryContents(dir);
                console.log(files); // Log the response to inspect its structure
                const filteredFiles = files.filter(file => !excludePrefixes.some(prefix => file.name.startsWith(prefix)));
                const dirElement = document.createElement('div');
                dirElement.innerHTML = `<h2>${dir}</h2><ul>${filteredFiles.map(file => `<li><a href="${file.html_url}" target="_blank">${file.name}</a></li>`).join('')}</ul>`;
                container.appendChild(dirElement);
            } catch (error) {
                console.error('Error fetching directory contents:', error);
            }
        }
    };

    displayContents();
});