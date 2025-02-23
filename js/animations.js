class BackgroundAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.element');
        this.mouse = { x: 0, y: 0 };
        this.isMoving = false;
        this.createParticles();
        this.initializeEventListeners();
    }

    createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    initializeEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        // Add hover interaction
        this.elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';  // Reset animation
                setTimeout(() => {
                    element.style.animation = 'shine 1s ease-in-out';
                }, 10);
            });
            
            element.addEventListener('animationend', () => {
                // Restore original floating animation
                element.style.animation = element.classList.contains('odd') ? 
                    'float 8s ease-in-out infinite' : 
                    'float 10s ease-in-out infinite reverse';
            });
        });

        // Optimize performance with requestAnimationFrame
        this.animate();
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.isMoving = true;

        // Reset moving flag after mouse stops
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.isMoving = false;
        }, 100);
    }

    getDistance(element) {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        return Math.sqrt(
            Math.pow(this.mouse.x - elementX, 2) + 
            Math.pow(this.mouse.y - elementY, 2)
        );
    }

    animate() {
        if (this.isMoving) {
            this.elements.forEach(element => {
                const distance = this.getDistance(element);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    const angle = Math.atan2(
                        this.mouse.y - element.offsetTop,
                        this.mouse.x - element.offsetLeft
                    );
                    
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = Math.cos(angle) * force * 30;
                    const moveY = Math.sin(angle) * force * 30;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    element.classList.add('moving');
                } else {
                    element.style.transform = '';
                    element.classList.remove('moving');
                }
            });
        } else {
            // Reset elements when mouse isn't moving
            this.elements.forEach(element => {
                element.style.transform = '';
                element.classList.remove('moving');
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animation = new BackgroundAnimation();
}); 