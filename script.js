document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. OPTIMIZED RIPPLE EFFECT ---
    let lastRippleTime = 0;
    const createRipple = (e) => {
        const now = Date.now();
        if (now - lastRippleTime < 50) return; // Only create a ripple every 50ms for performance
        lastRippleTime = now;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        document.body.appendChild(ripple);

        const size = 30; 
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - size/2}px`;
        ripple.style.top = `${e.clientY - size/2}px`;

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    };
    window.addEventListener('mousemove', createRipple);


    // --- 2. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate bars to X
            menuToggle.classList.toggle('is-active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    // --- 3. SCROLL REVEAL & ACTIVE NAV HIGHLIGHTING ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // A: Reveal animation for boxes/sections
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // B: Update Nav Active State
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Initialize state and observe
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        observer.observe(section);
    });

    // Helper class for revealed state
    const style = document.createElement('style');
    style.innerHTML = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);


    // --- 4. SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});