document.addEventListener("DOMContentLoaded", () => {

    // Register ScrollTrigger once at the very top
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 1. GLOBAL NAVBAR REVEAL (Runs on all pages)
    // ==========================================
    if (document.querySelector(".top-navbar")) {
        gsap.from(".top-navbar", {
            duration: 1,
            y: -40,
            opacity: 0,
            ease: "power3.out"
        });
    }

    // ==========================================
    // 2. HOMEPAGE INTRO ANIMATION (Home only)
    // ==========================================
    const homeIntro = document.querySelector(".video-container, #home h1, #home p");
    if (homeIntro) {
        gsap.from(".video-container, #home h1, #home p", {
            duration: 1.2,
            y: 20,
            opacity: 0,
            stagger: 0.25,
            delay: 0.3,
            ease: "power2.out"
        });
    }

    // ==========================================
    // 3. SPINNING FLOWER BACKGROUND (Home only)
    // ==========================================
    if (document.querySelector(".flower")) {
        gsap.to(".flower", {
            rotation: 360,      
            top: "80%",         
            ease: "none",       
            scrollTrigger: {
                trigger: "body",       
                start: "top top",      
                end: "bottom bottom",  
                scrub: 1.5             
            }
        });
    }

    // ==========================================
    // 4. VECTOR TRACING ZIGZAG LINE (Home only)
    // ==========================================
    const zigzagPath = document.querySelector(".zigzag-path");
    if (zigzagPath) {
        const pathLength = zigzagPath.getTotalLength();
        
        gsap.set(zigzagPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        gsap.to(zigzagPath, {
            strokeDashoffset: 0, 
            ease: "none",        
            scrollTrigger: {
                trigger: "#projects",
                start: "top bottom", 
                end: "bottom top",   
                scrub: 1             
            }
        });
    }

    // ==========================================
    // 5. PINNED CHECKERED PATTERN (Home only)
    // ==========================================
    if (document.querySelector("#pattern-divider")) {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            let { isDesktop } = context.conditions;

            ScrollTrigger.create({
                trigger: "#pattern-divider",
                start: isDesktop ? "top 20%" : "top 40%",       
                end: isDesktop ? "+=400" : "+=100",          
                pin: true,              
                scrub: true,
                onToggle: self => {
                    const divider = document.querySelector("#pattern-divider");
                    const body = document.body;
                    
                    if (self.isActive) {
                        divider.classList.add("color-shift");
                        body.classList.add("body-color-shift");
                    } 
                },
                onLeaveBack: () => {
                    document.querySelector("#pattern-divider").classList.remove("color-shift");
                    document.body.classList.remove("body-color-shift");
                }
            });
        });
    }

    // ==========================================
    // 6. LANGUAGE TOGGLE LOGIC (All pages)
    // ==========================================
    const langToggle = document.getElementById("lang-toggle");
    const bodyElement = document.body;

    if (langToggle) {
        langToggle.addEventListener("change", () => {
            if (langToggle.checked) {
                bodyElement.classList.replace("lang-en", "lang-de");
                updateLanguage("de");
            } else {
                bodyElement.classList.replace("lang-de", "lang-en");
                updateLanguage("en");
            }
        });
    }

    function updateLanguage(lang) {
        const translatableElements = document.querySelectorAll("[data-lang-en]");
        
        translatableElements.forEach(elem => {
            if (lang === "de") {
                elem.textContent = elem.getAttribute("data-lang-de");
            } else {
                elem.textContent = elem.getAttribute("data-lang-en");
            }
        });
        
        ScrollTrigger.refresh();
    }

    // ==========================================
    // 7. RESPONSIVE MOBILE MENU (All pages)
    // ==========================================
    const toggleBtn = document.getElementById("menu-toggle-btn");
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    const overlayLinks = document.querySelectorAll(".mobile-menu-links a");
    
    if (toggleBtn && menuOverlay) {
        let isMenuOpen = false;
        const menuTimeline = gsap.timeline({ paused: true });

        menuTimeline.to(".line-1", { duration: 0.4, y: 13, rotation: 30, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                    .to(".line-2", { duration: 0.4, rotation: 90, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                    .to(".line-3", { duration: 0.4, y: -13, rotation: -30, backgroundColor: "#1a1a1a", ease: "power2.out" }, 0)
                    .to(".menu-toggle", { duration: 0.5, rotation: 180, ease: "power2.inOut" }, 0); 

        menuTimeline.to(menuOverlay, {
            duration: 0.4,
            opacity: 1,
            visibility: "visible",
            pointerEvents: "auto",
            ease: "power2.out"
        }, 0);

        menuTimeline.from(".mobile-menu-links li", {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, 0.1);

        toggleBtn.addEventListener("click", () => {
            if (!isMenuOpen) {
                menuTimeline.play(); 
            } else {
                menuTimeline.reverse(); 
            }
            isMenuOpen = !isMenuOpen;
        });

        overlayLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuTimeline.reverse();
                isMenuOpen = false;
            });
        });
    }

    // ==========================================
    // 8. SOCIALS PILL ENTRANCE (Home only)
    // ==========================================
    if (document.querySelector(".socials-pill-container") && document.querySelector("#about")) {
        setTimeout(() => {
            gsap.to(".socials-pill-container", {
                opacity: 1,
                scale: 1,           
                duration: 0.6,
                ease: "back.out(1.2)", 
                scrollTrigger: {
                    trigger: "#about",         
                    start: "top 60%",          
                    end: "bottom bottom",
                    toggleActions: "play none none reverse", 
                }
            });
        }, 100);
    }

    // ==========================================
    // 9. PHOTOSTACK DECK ENGINES (If present)
    // ==========================================
    const stacks = document.querySelectorAll(".interactive-deck");
    if (stacks.length > 0) {
        stacks.forEach(stack => {
            let isAnimating = false;

            stack.addEventListener("click", () => {
                if (isAnimating) return;
                isAnimating = true;

                const layers = Array.from(stack.querySelectorAll(".stack-layer"));
                const currentTop = stack.querySelector(".active-top");
                
                currentTop.style.transition = "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease";
                currentTop.style.transform = "translate(80px, -40px) rotate(12deg)";
                currentTop.style.opacity = "0";

                setTimeout(() => {
                    currentTop.classList.remove("active-top");
                    currentTop.style.zIndex = "1"; 
                    currentTop.style.transition = "none"; 

                    layers.forEach(layer => {
                        if (layer.classList.contains("layer-1")) {
                            layer.classList.remove("layer-1");
                            layer.classList.add("layer-3");
                        } else if (layer.classList.contains("layer-2")) {
                            layer.classList.remove("layer-2");
                            layer.classList.add("layer-1");
                            layer.classList.add("active-top"); 
                        } else if (layer.classList.contains("layer-3")) {
                            layer.classList.remove("layer-3");
                            layer.classList.add("layer-2");
                        }
                    });

                    void currentTop.offsetWidth;

                    currentTop.style.transform = "";
                    currentTop.style.opacity = "";
                    
                    setTimeout(() => {
                        currentTop.style.zIndex = "";
                        currentTop.style.transition = "";
                        isAnimating = false; 
                    }, 50);

                }, 250); 
            });
        });
    }

    // ==========================================
    // 10. PORTRAIT FADE-IN (If present)
    // ==========================================
    if (document.querySelector(".portrait-wrapper") && document.querySelector("#about p")) {
        gsap.to(".portrait-wrapper", {
            opacity: 1,
            y: 0, 
            ease: "power1.out",
            scrollTrigger: {
                trigger: "#about p",        
                start: "center center",     
                end: "bottom center",       
                scrub: 1.2                  
            }
        });
    }

});