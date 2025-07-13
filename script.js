// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed navbar + extra space
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.project-card, .stat-item, .creative-item, .resume-card, .about-description, .code-block'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Special handling for about section elements
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animations for about section elements with staggered timing
                    const codeBlock = aboutSection.querySelector('.code-block');
                    const description = aboutSection.querySelector('.about-description');
                    const statItems = aboutSection.querySelectorAll('.stat-item');
                    
                    setTimeout(() => {
                        if (codeBlock) codeBlock.classList.add('visible');
                    }, 100);
                    
                    setTimeout(() => {
                        if (description) description.classList.add('visible');
                    }, 300);
                    
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 500 + (index * 100));
                    });
                    
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        aboutObserver.observe(aboutSection);
    }
});

// Typewriter Effect for Terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Terminal Command Simulation
document.addEventListener('DOMContentLoaded', () => {
    const commands = document.querySelectorAll('.command');
    
    commands.forEach((command, index) => {
        const text = command.textContent;
        command.textContent = '';
        
        setTimeout(() => {
            typeWriter(command, text, 100);
        }, (index + 1) * 1000);
    });
});

// Resume Upload Functionality
const uploadArea = document.getElementById('uploadArea');
const resumeFile = document.getElementById('resumeFile');
const downloadBtn = document.getElementById('downloadResume');
const viewBtn = document.getElementById('viewResume');

let uploadedFile = null;

// Click to browse files
uploadArea.addEventListener('click', () => {
    resumeFile.click();
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--accent-primary)';
    uploadArea.style.background = 'var(--bg-tertiary)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.background = 'var(--bg-secondary)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.background = 'var(--bg-secondary)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// File input change
resumeFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

function handleFileUpload(file) {
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB.');
        return;
    }
    
    uploadedFile = file;
    
    // Update upload area
    uploadArea.innerHTML = `
        <i class="fas fa-check-circle" style="color: var(--accent-primary);"></i>
        <p style="color: var(--accent-primary);">Resume uploaded successfully!</p>
        <p><strong>${file.name}</strong></p>
        <small>Click to upload a different file</small>
    `;
    
    // Enable download and view buttons
    downloadBtn.style.opacity = '1';
    downloadBtn.style.pointerEvents = 'auto';
    viewBtn.style.opacity = '1';
    viewBtn.style.pointerEvents = 'auto';
    
    // Update download link
    const url = URL.createObjectURL(file);
    downloadBtn.href = url;
    downloadBtn.download = file.name;
    viewBtn.href = url;
    viewBtn.target = '_blank';
}

// Initialize download buttons as disabled
downloadBtn.style.opacity = '0.5';
downloadBtn.style.pointerEvents = 'none';
viewBtn.style.opacity = '0.5';
viewBtn.style.pointerEvents = 'none';

// Code block copy functionality
document.querySelectorAll('.code-actions').forEach(action => {
    action.addEventListener('click', () => {
        const codeBlock = action.closest('.code-block');
        const codeContent = codeBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(codeContent).then(() => {
            // Show feedback
            const originalIcon = action.innerHTML;
            action.innerHTML = '<i class="fas fa-check"></i>';
            action.style.color = 'var(--accent-primary)';
            
            setTimeout(() => {
                action.innerHTML = originalIcon;
                action.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Terminal cursor blinking
setInterval(() => {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    });
}, 1000);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent functions are already called above
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        konamiCode = [];
    }
});

// Console message for developers
console.log(`
%c
██████╗  █████╗ ██╗  ██╗██╗██████╗ 
██╔══██╗██╔══██╗██║ ██╔╝██║██╔══██╗
██████╔╝███████║█████╔╝ ██║██████╔╝
██╔══██╗██╔══██║██╔═██╗ ██║██╔══██╗
██████╔╝██║  ██║██║  ██╗██║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

Welcome to my portfolio! 
If you're reading this, you're probably a developer too.
Let's connect and build something amazing together!

Email: bakir.dawood@email.com
LinkedIn: /in/bakirdawood
`, 'color: #00ff88; font-family: monospace;');

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
});