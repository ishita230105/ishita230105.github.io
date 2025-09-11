// Navigation functionality
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
        // Handle hash changes in URL
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                this.switchSection(hash);
            }
        });

        // Handle initial hash on page load
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
        
        // EmailJS configuration
        this.emailjsConfig = {
            serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            publicKey: 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        };
        
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });

            // Real-time validation
            this.nameField.addEventListener('blur', () => this.validateName());
            this.emailField.addEventListener('blur', () => this.validateEmail());
            this.messageField.addEventListener('blur', () => this.validateMessage());
            
            // Clear errors on input
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
            
            // Initialize EmailJS (only needs to be done once)
            emailjs.init(this.emailjsConfig.publicKey);
            
            // Professional email template HTML
            const emailTemplate = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
                            <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 14px;">Portfolio Contact Form</p>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 40px 30px;">
                            <div style="background-color: #f1f5f9; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                                <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.5;">
                                    You've received a new message through your portfolio contact form. Please respond at your earliest convenience.
                                </p>
                            </div>
                            
                            <!-- Message Card -->
                            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <!-- Message Header -->
                                <div style="background-color: #f8fafc; padding: 20px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; align-items: center; gap: 15px;">
                                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: #ffffff; font-size: 20px; font-weight: bold;">{{from_name}}</span>
                                        </div>
                                        <div>
                                            <h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 600;">{{from_name}}</h3>
                                            <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">{{from_email}}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Message Content -->
                                <div style="padding: 25px;">
                                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 3px solid #3b82f6;">
                                        <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div style="background-color: #f8fafc; padding: 15px 25px; border-top: 1px solid #e2e8f0; text-align: center;">
                                    <p style="margin: 0; color: #64748b; font-size: 12px;">
                                        Sent on {{time}} via Portfolio Contact Form
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="mailto:{{from_email}}?subject=Re: Your Portfolio Contact" 
                                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                                    Reply to {{from_name}}
                                </a>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #1e293b; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                © 2025 Ishita Modi Portfolio. This message was sent via the contact form.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Prepare template parameters
            const templateParams = {
                from_name: this.nameField.value.trim(),
                from_email: this.emailField.value.trim(),
                message: this.messageField.value.trim(),
                time: new Date().toLocaleString(),
                to_email: 'ishitamodi0@gmail.com', // Your email address
                template_html: emailTemplate // Include the HTML template
            };
            
            // Send email using EmailJS
            const response = await emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            this.showSuccessMessage();
            this.resetForm();
            
        } catch (error) {
            console.error('Failed to send email:', error);
            this.showErrorMessage('Failed to send message. Please try again or contact me directly at ishitamodi0@gmail.com');
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
        this.formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        this.formStatus.className = 'form-status success';
        this.formStatus.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.formStatus.style.display = 'none';
        }, 5000);
    }

    showErrorMessage(message) {
        this.formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        this.formStatus.className = 'form-status error';
        this.formStatus.style.display = 'block';
        
        // Hide error message after 7 seconds
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

// Smooth animations and interactions
class AnimationHandler {
    constructor() {
        this.init();
    }

    init() {
        // Add loading animation
        this.addLoadingAnimation();
        
        // Intersection Observer for scroll animations
        this.initScrollAnimations();
        
        // Add particle background effect
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

        // Observe skill categories, project cards, etc.
        document.querySelectorAll('.skill-category, .project-card, .education-card, .achievement-card').forEach(el => {
            observer.observe(el);
        });
    }

    initParticleEffect() {
        // Simple particle effect for the background
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

// Utility functions
class UtilityHandler {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.initKeyboardNavigation();
        
        // Add scroll-to-top functionality
        this.initScrollToTop();
        
        // Add dynamic theme adjustments
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
        // Scroll to top when switching sections
        document.addEventListener('sectionChanged', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initThemeHandler() {
        // Adjust theme based on time of day
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            // Slightly lighter theme during day hours
            document.documentElement.style.setProperty('--background-dark', '#1a1a2e');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationHandler = new NavigationHandler();
    window.contactFormHandler = new ContactFormHandler();
    window.animationHandler = new AnimationHandler();
    window.utilityHandler = new UtilityHandler();
    
    console.log('🚀 Ishita Modi Portfolio loaded successfully!');
});

// Performance optimization
window.addEventListener('beforeunload', () => {
    // Clean up animations
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register service worker here for offline functionality
        console.log('Service Worker support detected');
    });
}
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});
