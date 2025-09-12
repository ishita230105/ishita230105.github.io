class NavigationHandler {
    constructor() {
        this.currentSection = 'home';
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinksContainer = document.querySelector('.nav-links');
        
        this.init();
    }

    init() {
        // Navigation click handlers
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.switchSection(targetSection);
                this.closeMobileMenu();
            });
        });

        // Project view button handler
        const projectBtn = document.querySelector('[data-section="projects"]');
        if (projectBtn) {
            projectBtn.addEventListener('click', () => {
                this.switchSection('projects');
            });
        }

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });

        // Handle smooth scrolling for anchor links
        this.handleAnchorLinks();
    }

    switchSection(targetSection) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSectionElement = document.getElementById(targetSection);
        if (targetSectionElement) {
            targetSectionElement.classList.add('active');
        }

        // Update active nav link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });

        this.currentSection = targetSection;
    }

    toggleMobileMenu() {
        this.navLinksContainer.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navLinksContainer.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleAnchorLinks() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                this.switchSection(hash);
            }
        });
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            this.switchSection(initialHash);
        }
    }
}

// Contact form validation and handling
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameField = document.getElementById('name');
        this.emailField = document.getElementById('email');
        this.messageField = document.getElementById('message');
        this.submitBtn = document.getElementById('submitBtn');
        this.formStatus = document.getElementById('formStatus');
        
        this.emailjsConfig = {
            serviceId: 'service_s2insp8',
            templateId: 'template_qgp35tb',
            publicKey: 'dad-UbCjCV5g8d1jZ'
        };
        
        // Test EmailJS configuration
        this.testEmailJSConfig();
        
        this.init();
    }

    testEmailJSConfig() {
        console.log('EmailJS Configuration:');
        console.log('Service ID:', this.emailjsConfig.serviceId);
        console.log('Template ID:', this.emailjsConfig.templateId);
        console.log('Public Key:', this.emailjsConfig.publicKey);
        
        if (typeof emailjs !== 'undefined') {
            console.log('EmailJS library is loaded');
            try {
                emailjs.init(this.emailjsConfig.publicKey);
                console.log('EmailJS initialized successfully');
            } catch (error) {
                console.error('EmailJS initialization failed:', error);
            }
        } else {
            console.error('EmailJS library not found');
        }
    }


    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
            this.nameField.addEventListener('blur', () => this.validateName());
            this.emailField.addEventListener('blur', () => this.validateEmail());
            this.messageField.addEventListener('blur', () => this.validateMessage());
            
            this.nameField.addEventListener('input', () => this.clearError('nameError'));
            this.emailField.addEventListener('input', () => this.clearError('emailError'));
            this.messageField.addEventListener('input', () => this.clearError('messageError'));
        }
    }

    validateName() {
        const name = this.nameField.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name.length < 2) {
            this.showError('nameError', 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            this.showError('nameError', 'Name should only contain letters and spaces');
            return false;
        }
        
        this.clearError('nameError');
        return true;
    }

    validateEmail() {
        const email = this.emailField.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('emailError', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('emailError');
        return true;
    }

    validateMessage() {
        const message = this.messageField.value.trim();
        const errorElement = document.getElementById('messageError');
        
        if (message.length < 10) {
            this.showError('messageError', 'Message must be at least 10 characters long');
            return false;
        }
        
        if (message.length > 1000) {
            this.showError('messageError', 'Message must be less than 1000 characters');
            return false;
        }
        
        this.clearError('messageError');
        return true;
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    async handleSubmit() {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            await this.sendEmail();
        }
    }

    async sendEmail() {
        try {
            this.setLoadingState(true);
            
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS library not loaded. Please check your internet connection.');
            }
            
            console.log('Initializing EmailJS with public key:', this.emailjsConfig.publicKey);
            emailjs.init(this.emailjsConfig.publicKey);
            
            await new Promise(resolve => setTimeout(resolve, 100));
            const emailTemplate = `
                <h2>New Contact Form Message</h2>
                <p><strong>From:</strong> {{from_name}}</p>
                <p><strong>Email:</strong> {{from_email}}</p>
                <p><strong>Time:</strong> {{time}}</p>
                <hr>
                <h3>Message:</h3>
                <p>{{message}}</p>
                <hr>
                <p><em>This message was sent from your portfolio contact form.</em></p>
            `;
            const templateParams = {
                from_name: this.nameField.value.trim(),
                from_email: this.emailField.value.trim(),
                message: this.messageField.value.trim(),
                time: new Date().toLocaleString()
            };
            
            console.log('Sending email with params:', {
                serviceId: this.emailjsConfig.serviceId,
                templateId: this.emailjsConfig.templateId,
                templateParams: templateParams
            });
            const response = await emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            console.log('Response status:', response.status);
            console.log('Response text:', response.text);
            if (response.status === 200 || response.text === 'OK') {
                console.log('Email sent successfully, showing success message');
                this.showSuccessMessage();
                this.resetForm();
                
                alert('Message received! I\'ll get back to you soon.');
            } else {
                console.log('EmailJS returned unexpected status:', response.status, response.text);
                throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
            }
            
        } catch (error) {
            console.error('Failed to send email:', error);
            console.error('Error details:', {
                name: error?.name || 'Unknown',
                message: error?.message || 'No message',
                stack: error?.stack || 'No stack trace'
            });
            let errorMessage = 'Failed to send message. ';
            
            if (error && error.message) {
                console.log('Error message:', error.message);
                
                if (error.message.includes('Invalid template')) {
                    errorMessage += 'Template configuration error. ';
                } else if (error.message.includes('Invalid service')) {
                    errorMessage += 'Service configuration error. ';
                } else if (error.message.includes('Invalid public key')) {
                    errorMessage += 'API key error. ';
                } else if (error.message.includes('Account not found')) {
                    errorMessage += 'EmailJS account not found. Please check your configuration. ';
                } else if (error.message.includes('Network')) {
                    errorMessage += 'Network connection error. ';
                } else if (error.message.includes('EmailJS library not loaded')) {
                    errorMessage += 'EmailJS library failed to load. Please check your internet connection. ';
                } else {
                    errorMessage += `Error: ${error.message}. `;
                }
            } else {
                console.log('No error message available');
                errorMessage += 'Unknown error occurred. ';
            }
            
            errorMessage += 'Please try again or contact me directly at ishitamodi0@gmail.com';
            
            this.showErrorMessage(errorMessage);
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.submitBtn.disabled = true;
            this.submitBtn.style.opacity = '0.7';
        } else {
            this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            this.submitBtn.disabled = false;
            this.submitBtn.style.opacity = '1';
        }
    }

    showSuccessMessage() {
        console.log('Showing success message');
        console.log('Form status element:', this.formStatus);
        
        if (this.formStatus) {
            this.formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
            this.formStatus.className = 'form-status success';
            this.formStatus.style.display = 'block';
            this.formStatus.style.opacity = '1';
            this.formStatus.style.visibility = 'visible';
            this.formStatus.style.zIndex = '9999';
            console.log('Success message displayed');
        } else {
            console.error('Form status element not found');
        }
        setTimeout(() => {
            if (this.formStatus) {
                this.formStatus.style.display = 'none';
            }
        }, 10000);
    }

    showErrorMessage(message) {
        console.log('Showing error message:', message);
        console.log('Form status element:', this.formStatus);
        
        if (this.formStatus) {
            this.formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            this.formStatus.className = 'form-status error';
            this.formStatus.style.display = 'block';
            console.log('Error message displayed');
        } else {
            console.error('Form status element not found');
        }
        
        setTimeout(() => {
            this.formStatus.style.display = 'none';
        }, 7000);
    }

    resetForm() {
        this.form.reset();
        this.clearError('nameError');
        this.clearError('emailError');
        this.clearError('messageError');
        this.formStatus.style.display = 'none';
    }
}
class AnimationHandler {
    constructor() {
        this.init();
    }

    init() {
        this.addLoadingAnimation();
        
        this.initScrollAnimations();
        
        this.initParticleEffect();
    }

    addLoadingAnimation() {
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            document.body.style.transition = 'opacity 0.6s ease-out';
            document.body.style.opacity = '1';
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                }
            });
        }, observerOptions);
        document.querySelectorAll('.skill-category, .project-card, .education-card, .achievement-card').forEach(el => {
            observer.observe(el);
        });
    }

    initParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#3B82F6';
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            animationId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }
}
class UtilityHandler {
    constructor() {
        this.init();
    }

    init() {
        this.initKeyboardNavigation();

        this.initScrollToTop();
  
        this.initThemeHandler();
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                const keyMap = {
                    '1': 'home',
                    '2': 'about',
                    '3': 'education',
                    '4': 'projects',
                    '5': 'contact'
                };
                
                if (keyMap[e.key]) {
                    e.preventDefault();
                    window.navigationHandler.switchSection(keyMap[e.key]);
                }
            }
        });
    }

    initScrollToTop() {

        document.addEventListener('sectionChanged', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initThemeHandler() {

        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {

            document.documentElement.style.setProperty('--background-dark', '#1a1a2e');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.navigationHandler = new NavigationHandler();
    window.animationHandler = new AnimationHandler();
    window.utilityHandler = new UtilityHandler();
    setTimeout(() => {
        console.log('Checking EmailJS availability...');
        console.log('typeof emailjs:', typeof emailjs);
        
        if (typeof emailjs !== 'undefined') {
            console.log('EmailJS is available');
            window.contactFormHandler = new ContactFormHandler();
            console.log('Contact form initialized with EmailJS');
        } else {
            console.error('EmailJS not loaded - contact form disabled');
            console.error('Please check if the EmailJS CDN is accessible');
        }
    }, 1000);
    
    console.log('Ishita Modi Portfolio loaded successfully!');
});

window.addEventListener('beforeunload', () => {

    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Service Worker support detected');
    });
}
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});
