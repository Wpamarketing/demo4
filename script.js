// Ensure DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update(); // Sync with GSAP ScrollTrigger
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 2. Custom Magnetic Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target');
    const bookBtns = document.querySelectorAll('.book-btn');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Fast tracking for small dot
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Inertia for follower
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        gsap.set(follower, {
            x: followerX,
            y: followerY
        });
    });

    // Hover Effects
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        target.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // Special 'Book' / specific text cursor effect
    bookBtns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            // we remove hover so it doesn't conflict
            document.body.classList.remove('cursor-hover');
            document.body.classList.add('cursor-book');
            const text = btn.getAttribute('data-cursor-text') || 'Book';
            follower.innerText = text;
        });
        btn.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-book');
            follower.innerText = '';
        });
    });

    // Handle initial state if mouse starts over button
    // Not strictly necessary but good for robust custom cursors

    // Generate Golden Particles for Fullscreen Hero
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        for (let i = 0; i < 150; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');

            let size = Math.random() * 3 + 1; // 1 to 4px
            let posX = Math.random() * 100; // 0 to 100%
            let posY = Math.random() * 100; // 0 to 100%
            let delay = Math.random() * 15; // 0 to 15s
            let duration = Math.random() * 20 + 20; // 20s to 40s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`; // negative delay so they are already on screen

            particlesContainer.appendChild(particle);
        }
    }

    // 3. GSAP Animations

    // Hero Timeline
    const heroTl = gsap.timeline();
    heroTl.to('.stagger-text', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    })
        .to('.primary-btn', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");

    // About Section Image Gliding
    gsap.to('.img-left', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1
        },
        y: 0,
        opacity: 1,
        ease: "none"
    });

    gsap.to('.img-right', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1
        },
        y: 0,
        opacity: 1,
        ease: "none"
    });

    // Parallax Marigold Petals (Background pattern)
    gsap.to('.petal-pattern', {
        scrollTrigger: {
            trigger: '.about',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -100,
        ease: "none"
    });

    // Gallery Stagger Reveal
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery',
            start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Services Stagger Reveal
    gsap.from('.card-container', {
        scrollTrigger: {
            trigger: '.services',
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)" // Adds a bouncy feel
    });

    // Contact form fade in
    gsap.from('.contact-wrapper', {
        scrollTrigger: {
            trigger: '.contact',
            start: "top 75%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});
