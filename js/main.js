const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const content = document.getElementById('content');
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Toggle dark mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    updateDarkModeIcon();
    
    try {
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    } catch (e) {
        console.warn('localStorage access failed:', e);
    }
}

// Update dark mode icon and aria-label
function updateDarkModeIcon() {
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = sunIcon;
        darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
        darkModeToggle.setAttribute('data-tooltip', 'Toggle light mode');
    } else {
        darkModeToggle.innerHTML = moonIcon;
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        darkModeToggle.setAttribute('data-tooltip', 'Toggle dark mode');
    }
}

// Apply saved dark mode preference
function applySavedDarkMode() {
    try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let savedDarkMode = localStorage.getItem('darkMode') === 'true' || prefersDark;
        if (savedDarkMode) {
            body.classList.add('dark-mode');
            updateDarkModeIcon();
        }
    } catch (e) {
        console.warn('Failed to apply dark mode:', e);
    }
}

// Load section content dynamically
async function loadSection(sectionId) {
    try {
        // Apply fade-out
        content.classList.remove('fade-in');
        content.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300)); // Wait for fade-out

        // Clear current content
        content.innerHTML = '';
        
        // Load section HTML
        const response = await fetch(`sections/${sectionId}.html`);
        if (!response.ok) throw new Error(`Failed to load ${sectionId}.html`);
        const sectionHtml = await response.text();
        
        // Load footer for contact section
        let footerHtml = '';
        if (sectionId === 'contact') {
            const footerResponse = await fetch('sections/footer.html');
            if (!footerResponse.ok) throw new Error('Failed to load footer.html');
            footerHtml = await footerResponse.text();
        }
        
        // Update content
        content.innerHTML = sectionHtml + footerHtml;
        
        // Apply fade-in
        content.classList.remove('fade-out');
        content.classList.add('fade-in');
        
        // Update active section and animations
        updateActiveSection(sectionId);
        setupSectionAnimation();
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error loading section:', error);
        content.innerHTML = '<p class="text-red-600 text-center">Error loading section. Please try again.</p>';
        content.classList.remove('fade-out');
        content.classList.add('fade-in');
    }
}

// Navigate to index.html with fade transition
function navigateToHome() {
    if (!content.querySelector('#home')) {
        content.classList.remove('fade-in');
        content.classList.add('fade-out');
        setTimeout(() => {
            window.location.assign('index.html');
        }, 300); // Match fade-out duration
    } else {
        updateActiveSection('home');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Navigation functionality
function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    const content = document.getElementById('content');
    const isCollapsed = navbar.classList.contains('w-12');

    if (isCollapsed) {
        navbar.classList.remove('w-12');
        navbar.classList.add('w-48');
        content.classList.remove('ml-12', 'w-[calc(100%-3rem)]');
        content.classList.add('ml-48', 'w-[calc(100%-12rem)]');
        document.querySelectorAll('.nav-text').forEach(text => text.classList.remove('hidden'));
    } else {
        navbar.classList.remove('w-48');
        navbar.classList.add('w-12');
        content.classList.remove('ml-48', 'w-[calc(100%-12rem)]');
        content.classList.add('ml-12', 'w-[calc(100%-3rem)]');
        document.querySelectorAll('.nav-text').forEach(text => text.classList.add('hidden'));
    }

    navbar.classList.toggle('active');
}

// Progress bar
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
}

// Back to top button
function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Update active section in nav
function updateActiveSection(currentId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (currentId) {
        const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            const navIndicator = document.getElementById('navIndicator');
            const linkTop = activeLink.offsetTop;
            const linkHeight = activeLink.offsetHeight;
            
            navIndicator.style.top = linkTop + 'px';
            navIndicator.style.height = linkHeight + 'px';
        }
    }
}

// Fade-in animation for sections
function setupSectionAnimation() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Navigation link handling
function setupNavigation() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'home') {
                navigateToHome();
            } else {
                loadSection(targetId);
            }
        });
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    applySavedDarkMode();
    darkModeToggle.addEventListener('click', toggleDarkMode);
    document.getElementById('backToTop').addEventListener('click', scrollToTop);
    
    // Apply initial fade-in
    content.classList.add('fade-in');
    
    setupSectionAnimation();
    setupNavigation();
    
    // Set initial active section
    updateActiveSection('home');
    
    window.addEventListener('scroll', () => {
        updateProgressBar();
        toggleBackToTopButton();
    });
});