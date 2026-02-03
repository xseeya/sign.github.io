document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('streamers-container');
    
    // Show loading state
    container.innerHTML = '<div class="loading">Loading streamers...</div>';
    
    // Fetch JSON data
    fetch('streamers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load streamers data');
            }
            return response.json();
        })
        .then(streamers => {
            renderStreamers(streamers);
        })
        .catch(error => {
            console.error('Error loading streamers:', error);
            container.innerHTML = '<div class="error">Failed to load streamers. Please try again later.</div>';
        });
    
    function renderStreamers(streamers) {
        container.innerHTML = '';
        
        streamers.forEach((streamer, index) => {
            const card = createStreamerCard(streamer);
            card.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(card);
        });
    }
    
    function createStreamerCard(streamer) {
        const card = document.createElement('article');
        card.className = 'streamer-card';
        
        card.innerHTML = `
            <h2>
                ${escapeHtml(streamer.nickname)}
                <span class="info-icon">
                    i
                    <span class="description-tooltip">${escapeHtml(streamer.description)}</span>
                </span>
            </h2>
            <div class="signature">
                "${escapeHtml(streamer.signature)}"
            </div>
            <div class="links">
                <a href="${escapeHtml(streamer.links.hltv)}" 
                   class="hltv" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    HLTV Profile
                </a>
                <a href="${escapeHtml(streamer.links.twitch)}" 
                   class="twitch" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    Twitch
                </a>
            </div>
        `;
        
        return card;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
