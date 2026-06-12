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


    // Animate the circle crossing the screen ONLY during the projects section
    gsap.to(".background-circle", {
        left: "110%", // Moves all the way across to the right side (past the screen boundary)
        ease: "power1.inOut", // Smoothly accelerates and decelerates as it travels
        scrollTrigger: {
            trigger: "#projects",   // <-- Directs the animation to target the projects section
            start: "top bottom",    // Starts moving the moment the top of projects enters the bottom of the screen
            end: "bottom top",      // Finishes moving the moment the bottom of projects leaves the top of the screen
            scrub: 1                // Smoothly binds the horizontal pixel movement to your scrolling speed
        }
    });

// Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Pin the pattern section and permanently lock the color shift on entry
    ScrollTrigger.create({
        trigger: "#pattern-divider",
        start: "top 20%",       // Pins when the top of the pattern hits the top of the screen
        end: "+=400",          // Keeps it locked in place for 400px of scrolling
        pin: true,              
        scrub: true,
        onEnter: () => {
            // Fires EXACTLY once when scrolling down into the section
            document.querySelector("#pattern-divider").classList.add("color-shift");
            document.body.classList.add("body-color-shift");
        }
    });

});