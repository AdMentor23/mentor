class AdminDashboard {
    constructor() {
        // Check authentication and admin role
        this.user = Auth.checkAuth();
        if (!this.user || this.user.role !== 'admin') {
            window.location.href = '/index.html';
            return;
        }

        this.initializeElements();
        this.initializeEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
    }

    initializeElements() {
        // Navigation
        this.sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        this.sections = document.querySelectorAll('.dashboard-section');
        
        // Search
        this.userSearchInput = document.querySelector('.search-input');
        
        // Tables
        this.usersTableBody = document.getElementById('usersTableBody');
        this.bookingsTableBody = document.getElementById('bookingsTableBody');
    }

    initializeEventListeners() {
        // Navigation
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.getAttribute('href').substring(1));
            });
        });

        // Search
        this.userSearchInput.addEventListener('input', (e) => {
            this.handleUserSearch(e.target.value);
        });

        // Add new user button
        document.querySelector('.add-btn').addEventListener('click', () => {
            this.showAddUserModal();
        });
    }

    async loadDashboardData() {
        try {
            // This would fetch from Supabase
            const mockData = {
                totalUsers: 150,
                activeBookings: 25,
                revenue: 15000,
                users: [
                    {
                        name: 'John Doe',
                        email: 'john@example.com',
                        status: 'active',
                        joined: '2024-01-15'
                    }
                    // Add more mock users
                ],
                bookings: [
                    {
                        user: 'John Doe',
                        service: 'Leadership Webinar',
                        date: '2024-03-20',
                        status: 'confirmed'
                    }
                    // Add more mock bookings
                ]
            };

            this.updateDashboardStats(mockData);
            this.populateUsersTable(mockData.users);
            this.populateBookingsTable(mockData.bookings);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    initializeCharts() {
        // User Growth Chart
        new Chart(document.getElementById('userGrowthChart'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Users',
                    data: [50, 75, 100, 125, 150],
                    borderColor: '#2c5530'
                }]
            }
        });

        // Revenue Chart
        new Chart(document.getElementById('revenueChart'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Revenue (€)',
                    data: [5000, 7500, 10000, 12500, 15000],
                    backgroundColor: '#4a90a0'
                }]
            }
        });

        // Services Chart
        new Chart(document.getElementById('servicesChart'), {
            type: 'pie',
            data: {
                labels: ['Webinars', 'Programs', 'Coaching', 'Studies'],
                datasets: [{
                    data: [30, 25, 25, 20],
                    backgroundColor: ['#2c5530', '#4a90a0', '#8b7355', '#a0522d']
                }]
            }
        });
    }

    updateDashboardStats(data) {
        document.querySelector('[data-stat="users"] .stat-number').textContent = data.totalUsers;
        document.querySelector('[data-stat="bookings"] .stat-number').textContent = data.activeBookings;
        document.querySelector('[data-stat="revenue"] .stat-number').textContent = `€${data.revenue}`;
    }

    populateUsersTable(users) {
        this.usersTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>${user.joined}</td>
                <td>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    populateBookingsTable(bookings) {
        this.bookingsTableBody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.user}</td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
                <td>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Cancel</button>
                </td>
            </tr>
        `).join('');
    }

    handleUserSearch(searchTerm) {
        // This would typically filter users from Supabase
        const rows = this.usersTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    showAddUserModal() {
        // Implementation for adding new user
        alert('Add user functionality to be implemented');
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
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new AdminDashboard();
}); 