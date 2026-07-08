/* ====================================
   BIRTHDAY WEBSITE - MAIN SCRIPT
   For: Arifah Zakiyatul Khasanah
   Date: 29 Juni 2026
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ====== PRELOADER ======
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });

    // Fallback: hide preloader after 4s max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 4000);

    // ====== PARTICLES ======
    initParticles();

    // ====== ENTER BUTTON ======
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', () => {
        // Trigger confetti
        launchConfetti();
        // Smooth scroll to countdown
        document.getElementById('countdown-section').scrollIntoView({ behavior: 'smooth' });
    });

    // ====== COUNTDOWN ======
    initCountdown();

    // ====== BLOW CANDLES ======
    const blowBtn = document.getElementById('blow-btn');
    blowBtn.addEventListener('click', blowCandles);

    // ====== ENVELOPE / LETTER ======
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letter-paper');
    envelope.addEventListener('click', () => {
        envelope.classList.add('hidden');
        letterPaper.classList.remove('hidden');
    });

    // ====== MUSIC TOGGLE ======
    initMusic();

    // ====== HEART RAIN ======
    initHeartRain();

    // ====== SCROLL REVEAL ======
    initScrollReveal();
});

/* ====================================
   PARTICLES SYSTEM
   ==================================== */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            // Blue-ish colors
            const hue = 210 + Math.random() * 40;
            this.color = `hsla(${hue}, 80%, 70%, ${this.opacity})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.fadeDirection * 0.002;
            if (this.opacity <= 0.05 || this.opacity >= 0.6) {
                this.fadeDirection *= -1;
            }
            this.color = `hsla(220, 80%, 70%, ${this.opacity})`;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(220, 80%, 70%, ${this.opacity * 0.15})`;
            ctx.fill();
        }
    }

    // Create particles
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connections
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `hsla(220, 80%, 70%, ${0.05 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

/* ====================================
   COUNTDOWN TIMER
   ==================================== */
function initCountdown() {
    const targetDate = new Date('2026-06-29T00:00:00+07:00').getTime();
    
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const countdownGrid = document.getElementById('countdown');
    const countdownPast = document.getElementById('countdown-past');

    function update() {
        const now = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdownGrid.classList.add('hidden');
            countdownPast.classList.remove('hidden');
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* ====================================
   BLOW CANDLES
   ==================================== */
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const wishMessage = document.getElementById('wish-message');
    const blowBtn = document.getElementById('blow-btn');
    
    // Blow out each candle with delay
    flames.forEach((flame, i) => {
        setTimeout(() => {
            flame.classList.add('out');
            if (i === flames.length - 1) {
                // All candles blown out
                setTimeout(() => {
                    blowBtn.style.display = 'none';
                    wishMessage.classList.remove('hidden');
                    // Mini confetti burst
                    launchConfetti();
                }, 500);
            }
        }, i * 300);
    });
}

/* ====================================
   CONFETTI
   ==================================== */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#3b82f6', '#60a5fa', '#818cf8', '#a5b4fc', '#ffffff', '#93c5fd', '#6366f1'];
    const shapes = ['circle', 'rect', 'star'];

    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            vx: (Math.random() - 0.5) * 20,
            vy: Math.random() * -20 - 5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            gravity: 0.3,
            opacity: 1,
            decay: 0.005 + Math.random() * 0.01
        });
    }

    let frame = 0;
    const maxFrames = 300;

    function drawStar(cx, cy, size, ctx) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
            rot += step;
            ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            c.x += c.vx;
            c.vy += c.gravity;
            c.y += c.vy;
            c.rotation += c.rotationSpeed;
            c.opacity -= c.decay;
            c.vx *= 0.99;

            if (c.opacity <= 0) return;

            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate((c.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, c.opacity);
            ctx.fillStyle = c.color;

            if (c.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (c.shape === 'rect') {
                ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
            } else {
                drawStar(0, 0, c.size / 2, ctx);
            }
            ctx.restore();
        });

        frame++;
        if (frame < maxFrames && confetti.some(c => c.opacity > 0)) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}

/* ====================================
   MUSIC (Web Audio API - Simple Melody)
   ==================================== */
function initMusic() {
    const btn = document.getElementById('music-toggle');
    let audioCtx = null;
    let isPlaying = false;
    let melodyInterval = null;
    let gainNode = null;

    // Happy birthday melody notes (simplified)
    const melody = [
        { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'D4', dur: 0.6 },
        { note: 'C4', dur: 0.6 }, { note: 'F4', dur: 0.6 }, { note: 'E4', dur: 1.2 },
        { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'D4', dur: 0.6 },
        { note: 'C4', dur: 0.6 }, { note: 'G4', dur: 0.6 }, { note: 'F4', dur: 1.2 },
        { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.3 }, { note: 'C5', dur: 0.6 },
        { note: 'A4', dur: 0.6 }, { note: 'F4', dur: 0.6 }, { note: 'E4', dur: 0.6 },
        { note: 'D4', dur: 0.6 }, { note: 'Bb4', dur: 0.3 }, { note: 'Bb4', dur: 0.3 },
        { note: 'A4', dur: 0.6 }, { note: 'F4', dur: 0.6 }, { note: 'G4', dur: 0.6 },
        { note: 'F4', dur: 1.2 }
    ];

    const noteFreq = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
        'C5': 523.25
    };

    function playNote(freq, startTime, duration) {
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        noteGain.gain.setValueAtTime(0.15, startTime + duration - 0.05);
        noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.connect(noteGain);
        noteGain.connect(gainNode);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    function playMelody() {
        let time = audioCtx.currentTime + 0.1;
        melody.forEach(({ note, dur }) => {
            const freq = noteFreq[note];
            if (freq) {
                playNote(freq, time, dur);
            }
            time += dur;
        });
        return time - audioCtx.currentTime;
    }

    function startMusic() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.connect(audioCtx.destination);
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const totalDuration = playMelody();
        melodyInterval = setInterval(() => {
            playMelody();
        }, totalDuration * 1000 + 500);

        isPlaying = true;
        btn.classList.add('playing');
    }

    function stopMusic() {
        if (melodyInterval) clearInterval(melodyInterval);
        if (audioCtx) audioCtx.suspend();
        isPlaying = false;
        btn.classList.remove('playing');
    }

    btn.addEventListener('click', () => {
        if (isPlaying) {
            stopMusic();
        } else {
            startMusic();
        }
    });
}

/* ====================================
   HEART RAIN
   ==================================== */
function initHeartRain() {
    const container = document.getElementById('heart-rain');
    const hearts = ['💙', '🤍', '🖤', '💎', '⭐', '✨', '🦋'];
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'falling-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }
    
    // Create hearts periodically when footer is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const interval = setInterval(createHeart, 400);
                // Store to clear later
                entry.target._heartInterval = interval;
            } else {
                if (entry.target._heartInterval) {
                    clearInterval(entry.target._heartInterval);
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(document.getElementById('footer-section'));
}

/* ====================================
   SCROLL REVEAL
   ==================================== */
function initScrollReveal() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .section-subtitle-kr, .countdown-card, ' +
        '.cake-container, .letter-container, .featured-photo-container, .wishes-container'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}
