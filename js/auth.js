class AuthManager {
    constructor() {
        this.modal = document.getElementById('authModal');
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.loginBtn = document.getElementById('loginBtn');
        this.registerBtn = document.getElementById('registerBtn');
        this.closeBtn = document.querySelector('.close');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Modal controls
        this.loginBtn.addEventListener('click', () => this.openModal('login'));
        this.registerBtn.addEventListener('click', () => this.openModal('register'));
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Tab switching
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Form submissions
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    openModal(tab = 'login') {
        this.modal.style.display = 'block';
        this.switchTab(tab);
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.clearForms();
    }

    switchTab(tab) {
        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Show/hide forms
        this.loginForm.classList.toggle('hidden', tab !== 'login');
        this.registerForm.classList.toggle('hidden', tab !== 'register');
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            // This would typically authenticate with Supabase
            const mockUser = {
                email: email,
                role: email.includes('admin') ? 'admin' : 'user'
            };

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Redirect based on user role
            if (mockUser.role === 'admin') {
                window.location.href = '/dashboard/admin.html';
            } else {
                window.location.href = '/dashboard/user.html';
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const company = document.getElementById('registerCompany').value;

        try {
            // Here you would typically make an API call to your backend
            console.log('Register attempt:', { name, email, password, company });
            // Simulate API call
            await this.simulateApiCall();
            this.showSuccess(this.registerForm, 'Registration successful!');
            setTimeout(() => this.closeModal(), 1500);
        } catch (error) {
            this.showError(this.registerForm, error.message);
        }
    }

    simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve();
                } else {
                    reject(new Error('Something went wrong. Please try again.'));
                }
            }, 1000);
        });
    }

    showError(form, message) {
        const errorDiv = form.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!form.querySelector('.error-message')) {
            form.appendChild(errorDiv);
        }
    }

    showSuccess(form, message) {
        const successDiv = form.querySelector('.success-message') || document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        if (!form.querySelector('.success-message')) {
            form.appendChild(successDiv);
        }
    }

    clearForms() {
        this.loginForm.reset();
        this.registerForm.reset();
        const messages = document.querySelectorAll('.error-message, .success-message');
        messages.forEach(msg => msg.remove());
    }

    // Add authentication check function
    static checkAuth() {
        const user = localStorage.getItem('user');
        if (!user) {
            window.location.href = '/index.html';
            return null;
        }
        return JSON.parse(user);
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthManager();
}); 