
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';

    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 5 + 2,
                shape: Math.random() > 0.5 ? 'circle' : 'square'
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';

        particles.forEach(p => {
            ctx.beginPath();
            if (p.shape === 'circle') {
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            } else {
                ctx.rect(p.x, p.y, p.size * 1.5, p.size * 1.5);
            }
            ctx.fill();
        });
    }

    function update() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) {
                p.vx *= -1;
            }
            if (p.y < 0 || p.y > canvas.height) {
                p.vy *= -1;
            }
        });
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
});
