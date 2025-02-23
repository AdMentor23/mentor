document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll-based header styling
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        // Add shadow when scrolled
        header.style.boxShadow = currentScroll > 0 
            ? '0 2px 4px rgba(0,0,0,0.1)' 
            : 'none';

        lastScroll = currentScroll;
    });

    // LinkedIn Articles Integration
    const loadLinkedInArticles = async () => {
        const articlesContainer = document.querySelector('.articles-grid');
        // This would typically fetch from an API
        const mockArticles = [
            {
                title: 'Leadership in Complex Times',
                snippet: 'Exploring new paradigms of leadership...',
                link: '#'
            },
            {
                title: 'The Power of Deep Listening',
                snippet: 'How active listening transforms leadership...',
                link: '#'
            },
            {
                title: 'Building Resilient Teams',
                snippet: 'Strategies for sustainable team growth...',
                link: '#'
            }
        ];

        mockArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'article-card';
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.snippet}</p>
                <a href="${article.link}" class="read-more">Read More</a>
            `;
            articlesContainer.appendChild(articleElement);
        });
    };

    // Support Button Functionality
    const initializeSupportButton = () => {
        const supportBtn = document.getElementById('supportBtn');
        const supportModal = document.querySelector('.support-modal');
        
        if (supportBtn && supportModal) {
            supportBtn.addEventListener('click', () => {
                supportModal.classList.toggle('active');
            });

            // Handle support options
            document.querySelectorAll('.support-option').forEach(option => {
                option.addEventListener('click', async () => {
                    const amount = option.dataset.amount;
                    try {
                        // This would typically integrate with a payment processor
                        alert(`Processing €${amount} support payment...`);
                        supportModal.classList.remove('active');
                    } catch (error) {
                        alert('Payment processing failed. Please try again.');
                    }
                });
            });

            // Close modal when clicking outside
            document.addEventListener('click', (e) => {
                if (!supportBtn.contains(e.target) && !supportModal.contains(e.target)) {
                    supportModal.classList.remove('active');
                }
            });
        }
    };

    // Initialize LinkedIn Articles
    loadLinkedInArticles();
    // Initialize Support Button
    initializeSupportButton();

    // Calendly Integration
    const scheduleBtn = document.getElementById('scheduleBtn');
    scheduleBtn.addEventListener('click', () => {
        Calendly.initPopupWidget({
            url: 'https://calendly.com/your-calendly-link'
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // This would typically send to your backend
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });

    // Service Card Actions
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            switch(action) {
                case 'Purchase Now':
                    // Implement payment flow
                    break;
                case 'Contact for Details':
                    // Scroll to contact form
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'Download Now':
                    // Implement download logic
                    break;
                case 'Schedule a Call':
                    // Open Calendly
                    scheduleBtn.click();
                    break;
            }
        });
    });

    // Approach Tabs
    const tabHeaders = document.querySelectorAll('.tab-header');
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Remove active class from all headers and panels
            document.querySelectorAll('.tab-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked header and corresponding panel
            header.classList.add('active');
            const tabId = header.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-ready');
        observer.observe(section);
    });

    // Add hover effect for expertise items
    document.querySelectorAll('.expertise-item').forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.expertise-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
}); 