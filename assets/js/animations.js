// Initial GSAP setup
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // Smooth fade and lift on load for hero content
  gsap.from(".home-header_left > *", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.08,
    delay: 0.1
  });

  // Parallax effect for hero image
  const heroImg = document.querySelector(".home-header_image");
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-home-header",
        start: "top top",
        end: "+=50%",
        scrub: true
      }
    });
  }

  // Scroll reveal utilities
  const reveal = (selector, opts = {}) => {
    const defaults = { y: 24, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 };
    const config = { ...defaults, ...opts };
    const targets = document.querySelectorAll(selector);
    targets.forEach((el) => {
      gsap.from(el.children.length ? el.children : el, {
        ...config,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  };

  reveal(".home-skils_list-wrapper", { y: 30, duration: 0.7 });
  reveal(".home-portfolio_list", { y: 30, duration: 0.7 });
  reveal(".testimonials_list-wrapper", { y: 30, duration: 0.7 });
  reveal(".process-list", { y: 30, duration: 0.7 });

  // Hover tilt for cards
  const tiltTargets = document.querySelectorAll(
    ".home-skils_item, .home-portfolio_item-wrapper, .testimonials_item, .button, .button-secondary"
  );
  tiltTargets.forEach((card) => {
    let ctx;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10; // -5 to 5
      const rotateX = ((y / rect.height) - 0.5) * -10; // -5 to 5
      gsap.to(card, { rotateX, rotateY, scale: 1.02, transformPerspective: 600, transformOrigin: "center", duration: 0.2 });
    };
    const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.3, ease: "power2.out" });

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });

  // Scrollspy for navbar
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar_menu .navbar_link");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => setActive(section.id),
      onEnterBack: () => setActive(section.id)
    });
  });
  function setActive(id) {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        a.classList.toggle("w--current", href.slice(1) === id);
      }
    });
  }
}

// Theme toggle
(function(){
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const apply = (v) => document.body.classList.toggle('dark', v === 'dark');
  const saved = localStorage.getItem('theme');
  if (saved) apply(saved);
  btn.addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
    btn.textContent = next === 'dark' ? '☀' : '☾';
  });
})();


