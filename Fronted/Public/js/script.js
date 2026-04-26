document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Glass evidente al hacer scroll
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            // Cuando hay scroll, el header se vuelve más denso y oscuro
            header.style.backgroundColor = 'rgba(150, 20, 20, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        } else {
            // Cuando está arriba del todo, es más claro
            header.style.backgroundColor = 'rgba(198, 40, 40, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Animación suave para secciones (se mantiene)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        observer.observe(section);
    });

    // 3. Scroll suave para los enlaces del menú
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});