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
            card.style.animationDelay = `${index * 0.05}s`;
            container.appendChild(card);
        });
    }
    
    function createStreamerCard(streamer) {
        const card = document.createElement('article');
        card.className = 'streamer-card';
        
        // Generate liquipedia link
        let liquipediaHtml = '';
        if (streamer.links && streamer.links.liquipedia && streamer.links.liquipedia.trim() !== '') {
            liquipediaHtml = `
                <a href="${escapeHtml(streamer.links.liquipedia)}" 
                   class="info-icon" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   title="View on Liquipedia">
                    i
                </a>
            `;
        }
        
        // Generate links HTML dynamically
        let linksHtml = '';
        if (streamer.links && streamer.links.twitch) {
            linksHtml += `
                <a href="${escapeHtml(streamer.links.twitch)}" 
                   class="twitch" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
                    Twitch
                </a>
            `;
        }
        if (streamer.links && streamer.links.hltv && streamer.links.hltv.trim() !== '') {
            linksHtml += `
                <a href="${escapeHtml(streamer.links.hltv)}" 
                   class="hltv" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    HLTV
                </a>
            `;
        }
        if (streamer.links && streamer.links.youtube) {
            linksHtml += `
                <a href="${escapeHtml(streamer.links.youtube)}" 
                   class="youtube" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    YouTube
                </a>
            `;
        }
        
        card.innerHTML = `
            <h2>
                ${escapeHtml(streamer.nickname)}
                ${liquipediaHtml}
            </h2>
            <div class="links">
                ${linksHtml}
            </div>
        `;
        
        return card;
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
