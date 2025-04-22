// Load posts from the JSON file
async function loadPosts() {
    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) {
            throw new Error('Failed to load posts');
        }
        
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-container').innerHTML = 
            '<div class="error">Failed to load posts. Please try again later.</div>';
    }
}

// Display posts on the home page
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    
    // Clear loading message
    postsContainer.innerHTML = '';
    
    // Create post cards
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="posts/${post.slug}.html" class="read-more">Read More</a>
            </div>
        `;
        
        postsContainer.appendChild(postCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname.endsWith('/') || 
        window.location.pathname.split('/').pop() === '') {
        loadPosts();
    }
});


