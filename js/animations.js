class BackgroundAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.element');
        this.mouse = { x: 0, y: 0 };
        this.isMoving = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
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
                const maxDistance = 300; // Maximum distance for interaction
                
                if (distance < maxDistance) {
                    const rect = element.getBoundingClientRect();
                    const elementX = rect.left + rect.width / 2;
                    const elementY = rect.top + rect.height / 2;
                    
                    // Calculate angle between mouse and element
                    const angle = Math.atan2(
                        this.mouse.y - elementY,
                        this.mouse.x - elementX
                    );
                    
                    // Move element away from mouse
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = -Math.cos(angle) * force * 100;
                    const moveY = -Math.sin(angle) * force * 100;
                    
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