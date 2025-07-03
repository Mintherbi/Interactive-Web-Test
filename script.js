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
        
        // Add collision detection
        span.dataset.originalColor = 'white';
        span.dataset.hasHitWall = 'false';
        
        document.body.appendChild(span);
    }
    
    // Start collision detection
    startCollisionDetection();
}

function startCollisionDetection() {
    const characters = document.querySelectorAll('.floating-number');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    function checkCollisions() {
        characters.forEach(char => {
            const rect = char.getBoundingClientRect();
            const charWidth = rect.width;
            const charHeight = rect.height;
            
            // Check if character hits any wall
            const hitsLeftWall = rect.left <= 0;
            const hitsRightWall = rect.right >= viewportWidth;
            const hitsTopWall = rect.top <= 0;
            const hitsBottomWall = rect.bottom >= viewportHeight;
            
            if (hitsLeftWall || hitsRightWall || hitsTopWall || hitsBottomWall) {
                if (char.dataset.hasHitWall === 'false') {
                    // Change color when hitting wall for the first time
                    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    char.style.color = randomColor;
                    char.style.textShadow = `0 0 10px ${randomColor}`;
                    char.dataset.hasHitWall = 'true';
                    
                    // Add bounce effect
                    char.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        char.style.transform = 'scale(1)';
                    }, 200);
                }
            } else {
                // Reset wall hit status when character moves away from walls
                char.dataset.hasHitWall = 'false';
            }
        });
    }
    
    // Check collisions every 100ms
    setInterval(checkCollisions, 100);
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