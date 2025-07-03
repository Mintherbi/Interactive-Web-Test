function createFloatingText(text) {
    // Remove any existing floating characters
    const existingChars = document.querySelectorAll('.floating-number');
    existingChars.forEach(char => char.remove());
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'floating-number';
        span.textContent = char;
        
        // Assign random animation class
        const randomAnimations = [
            'float-random-1', 'float-random-2', 'float-random-3', 
            'float-random-4', 'float-random-5', 'float-random-6', 
            'float-random-7', 'float-random-8'
        ];
        const randomClass = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
        span.classList.add(randomClass);
        
        // Random animation delay
        span.style.animationDelay = `${Math.random() * 2}s`;
        
        // Position randomly across the entire viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const randomX = Math.random() * viewportWidth;
        const randomY = Math.random() * viewportHeight;
        
        span.style.left = `${randomX}px`;
        span.style.top = `${randomY}px`;
        
        document.body.appendChild(span);
    }
}

function showTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    const now = new Date();
    
    // Format the time with options - showing exact click time
    const timeOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    const formattedTime = now.toLocaleDateString('en-US', timeOptions);
    
    // Add a nice animation effect
    timeDisplay.classList.add('hidden');
    
    setTimeout(() => {
        const displayText = `Button clicked at: ${formattedTime}`;
        createFloatingText(displayText);
        timeDisplay.classList.remove('hidden');
        timeDisplay.classList.add('visible');
    }, 150);
}

// Initialize with a message instead of auto-showing time
window.onload = function() {
    createFloatingText('Click the button to see when you clicked it!');
    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.classList.remove('hidden');
    timeDisplay.classList.add('visible');
}; 