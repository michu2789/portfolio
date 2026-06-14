document.addEventListener("DOMContentLoaded", () => {

    // (Keep your existing header/initial fade-in code here!)
    // Elegantly reveal the top nav layout on load
    gsap.from(".top-navbar", {
        duration: 1,
        y: -40,
        opacity: 0,
        ease: "power3.out"
    });

    // Fade the introductory home section text in
    gsap.from("#home h1, #home p", {
        duration: 1.2,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out"
    });

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Smoothly rotate AND push the SVG to the bottom as the user scrolls
    gsap.to(".custom-svg-shape", {
        rotation: 360,      // Keeps the elegant spinning behavior
        top: "80%",         // Smoothly moves the SVG down toward the bottom of the screen
        ease: "none",       
        scrollTrigger: {
            trigger: "body",       // Tracks across the entire height of the website
            start: "top top",      // Starts moving the second you begin scrolling
            end: "bottom bottom",  // Reaches 85% exactly when you hit the absolute bottom
            scrub: 1.5             // Maintains that smooth, fluid lag catch-up effect
        }
    });

// Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // DYNAMIC SVG VECTOR TRACING LOGIC
    const zigzagPath = document.querySelector(".zigzag-path");
    
    // Ask the browser to measure the exact math length of your custom line design
    const pathLength = zigzagPath.getTotalLength();
    
    // Initialize the line as completely hidden by setting the dash gaps to match its own length
    gsap.set(zigzagPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
    });

    // Trace your custom line dynamically as the user scrolls down through projects
    gsap.to(zigzagPath, {
        strokeDashoffset: 0, // Reduces the offset to 0, drawing the line completely into view
        ease: "none",        // Perfect 1:1 mechanical sync to the scroll wheel movement
        scrollTrigger: {
            trigger: "#projects",
            start: "top bottom", // Animation begins the instant the project block hits the screen bottom
            end: "bottom top",   // Animation completes the instant the projects block scrolls away out of view
            scrub: 1             // Smooth, fluid lag-catchup weight tracking
        }
    });


// Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Pin the pattern section and dynamically shift colors based on scroll direction
    ScrollTrigger.create({
        trigger: "#pattern-divider",
        start: "top 20%",       // Pins when the top of the pattern hits the top of the viewport
        end: "+=400",          // Keeps it locked in place for 400px of scrolling
        pin: true,              
        scrub: true,
        onToggle: self => {
            const divider = document.querySelector("#pattern-divider");
            const body = document.body;
            
            // If we are actively sitting in the pinned zone, turn on the color shift
            if (self.isActive) {
                divider.classList.add("color-shift");
                body.classList.add("body-color-shift");
            } 
        },
        onLeaveBack: () => {
            // CRITICAL: When scrolling UP and completely leaving the top of the pattern,
            // this strips the classes away to revert everything back to original sage green!
            document.querySelector("#pattern-divider").classList.remove("color-shift");
            document.body.classList.remove("body-color-shift");
        }
    });

// LANGUAGE TOGGLE LOGIC
    const langToggle = document.getElementById("lang-toggle");
    const bodyElement = document.body;

    langToggle.addEventListener("change", () => {
        if (langToggle.checked) {
            // Switch to German
            bodyElement.classList.replace("lang-en", "lang-de");
            updateLanguage("de");
        } else {
            // Switch to English
            bodyElement.classList.replace("lang-de", "lang-en");
            updateLanguage("en");
        }
    });

    function updateLanguage(lang) {
        // Find every element that has translation data
        const translatableElements = document.querySelectorAll("[data-lang-en]");
        
        translatableElements.forEach(elem => {
            if (lang === "de") {
                elem.textContent = elem.getAttribute("data-lang-de");
            } else {
                elem.textContent = elem.getAttribute("data-lang-en");
            }
        });
        
        // Refresh ScrollTrigger calculations in case content heights shifted slightly
        ScrollTrigger.refresh();
    }

// RESPONSIVE MOBILE POPUP MENU & STAR MORPH
    const toggleBtn = document.getElementById("menu-toggle-btn");
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    const overlayLinks = document.querySelectorAll(".mobile-menu-links a");
    
    let isMenuOpen = false;

    // Create a standalone master GSAP timeline for the star transformation layout
    const menuTimeline = gsap.timeline({ paused: true });

    // 1. Morph the 3 straight lines into a geometric intersecting star pattern
    menuTimeline.to(".line-1", { duration: 0.4, y: 13, rotation: 30, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                .to(".line-2", { duration: 0.4, rotation: 90, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                .to(".line-3", { duration: 0.4, y: -13, rotation: -30, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                .to(".menu-toggle", { duration: 0.5, rotation: 180, ease: "power2.inOut" }, 0); // Spun the whole button box for extra flair

    // 2. Animate the full-bleed link overlay fading in smoothly
    menuTimeline.to(menuOverlay, {
        duration: 0.4,
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        ease: "power2.out"
    }, 0);

    // 3. Cascade the big menu text links upward into sight sequentially
    menuTimeline.from(".mobile-menu-links li", {
        duration: 0.4,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, 0.1);

    // Click Tripwire Controller
    toggleBtn.addEventListener("click", () => {
        if (!isMenuOpen) {
            menuTimeline.play(); // Transforms into a star and opens popup
        } else {
            menuTimeline.reverse(); // Morphs back into 3 stripes and closes popup
        }
        isMenuOpen = !isMenuOpen;
    });

    // Auto-close menu window when clicking any menu anchor link option
    overlayLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuTimeline.reverse();
            isMenuOpen = false;
        });
    });

// Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // CRITICAL FIX: Wrap the animation inside a tiny timeout delay.
    // This gives the pinned checkered pattern time to lock into place 
    // before the browser calculates exactly where the About section sits.
    setTimeout(() => {
        
        gsap.to(".socials-pill-container", {
            opacity: 1,
            scale: 1,           
            duration: 0.6,
            ease: "back.out(1.2)", 
            scrollTrigger: {
                trigger: "#about",         // Watches the About section
                start: "top 60%",          // Triggers when the top of the section enters the lower-middle viewport
                end: "bottom bottom",
                toggleActions: "play none none reverse", // Plays going down, reverses going up
                // invalidateOnRefresh: true // Recalculates dynamically if the screen size changes
            }
        });

    }, 100); // A brief 100ms pause ensures perfect structural execution

})