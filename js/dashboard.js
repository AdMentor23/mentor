class UserDashboard {
    constructor() {
        // Check authentication first
        this.user = Auth.checkAuth();
        if (!this.user) return;

        this.initializeElements();
        this.initializeEventListeners();
        this.loadUserData();
        this.loadServices();
        this.loadBookings();
        this.loadResources();
    }

    initializeElements() {
        // Navigation elements
        this.sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        this.sections = document.querySelectorAll('.dashboard-section');
        
        // User elements
        this.userNameSpan = document.getElementById('userName');
        this.userEmailSpan = document.getElementById('userEmail');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        // Forms
        this.profileForm = document.getElementById('profileForm');
    }

    initializeEventListeners() {
        // Navigation
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.getAttribute('href').substring(1));
            });
        });

        // Logout
        this.logoutBtn.addEventListener('click', () => this.handleLogout());

        // Profile form
        this.profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
    }

    async loadUserData() {
        try {
            // Use stored user data
            const userData = {
                ...this.user,
                full_name: this.user.email.split('@')[0], // Temporary mock data
                company: 'Acme Corp',
                bio: 'Leadership enthusiast'
            };

            this.updateUserInterface(userData);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async loadServices() {
        try {
            const servicesGrid = document.querySelector('.services-grid');
            // This would fetch from Supabase
            const mockServices = [
                {
                    name: 'Leadership Webinar',
                    status: 'active',
                    nextSession: '2024-03-20'
                }
                // Add more mock services
            ];

            servicesGrid.innerHTML = mockServices.map(service => `
                <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>Status: ${service.status}</p>
                    <p>Next Session: ${service.nextSession}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading services:', error);
        }
    }

    async loadBookings() {
        try {
            const bookingsList = document.querySelector('.bookings-list');
            // This would fetch from Supabase
            const mockBookings = [
                {
                    service: 'Leadership Webinar',
                    date: '2024-03-20',
                    status: 'confirmed'
                }
                // Add more mock bookings
            ];

            bookingsList.innerHTML = mockBookings.map(booking => `
                <div class="booking-card">
                    <h3>${booking.service}</h3>
                    <p>Date: ${booking.date}</p>
                    <p>Status: ${booking.status}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }

    async loadResources() {
        try {
            const resourcesGrid = document.querySelector('.resources-grid');
            // This would fetch from Supabase
            const mockResources = [
                {
                    title: 'Leadership Guide',
                    type: 'PDF',
                    url: '#'
                }
                // Add more mock resources
            ];

            resourcesGrid.innerHTML = mockResources.map(resource => `
                <div class="resource-card">
                    <h3>${resource.title}</h3>
                    <p>Type: ${resource.type}</p>
                    <a href="${resource.url}" class="download-btn">Download</a>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading resources:', error);
        }
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        try {
            const formData = {
                full_name: document.getElementById('profileName').value,
                email: document.getElementById('profileEmail').value,
                company: document.getElementById('profileCompany').value,
                bio: document.getElementById('profileBio').value
            };

            // This would update in Supabase
            console.log('Updating profile:', formData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    }

    async handleLogout() {
        try {
            // Clear user data
            localStorage.removeItem('user');
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    switchSection(sectionId) {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        this.sidebarLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`a[href="#${sectionId}"]`).parentElement.classList.add('active');
    }

    updateUserInterface(userData) {
        this.userNameSpan.textContent = userData.full_name;
        this.userEmailSpan.textContent = userData.email;
        
        // Update profile form
        document.getElementById('profileName').value = userData.full_name;
        document.getElementById('profileEmail').value = userData.email;
        document.getElementById('profileCompany').value = userData.company || '';
        document.getElementById('profileBio').value = userData.bio || '';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new UserDashboard();
}); 