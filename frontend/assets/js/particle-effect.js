const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the window
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// Particle settings
let particles = [];
const baseParticleDensity = 0.0000454; // Density per pixel (modifiable)
const colors = ["#FFFFFF", "#686E75", "#ba0a3c", "#730022"]; // Particle colors

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
}

// Calculate particle count dynamically
function calculateParticleCount() {
  const screenArea = canvas.width * canvas.height; // Area of the canvas
  return Math.max(50, Math.floor(screenArea * baseParticleDensity)); // Minimum of 50 particles
}

// Initialize particles
function initParticles() {
  particles = []; // Clear existing particles
  const particleCount = calculateParticleCount();

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Draw lines between particles
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) { // Connect nearby particles
        const opacity = 0.3; // Use a fixed opacity for smoother lines
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";; 
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}


// Animation loop
function animate() {
  ctx.fillStyle = "#202020"; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  drawLines(); // Add line connections between particles

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  let oldWidth = canvas.width;
  let oldHeight = canvas.height;

  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  particles.forEach((particle) => {
    particle.x *= canvas.width / oldWidth;
    particle.y *= canvas.height / oldHeight;
  });
});

// Start animation
initParticles();
animate();

// Header scroll behavior (no changes from original)
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");

      // Dynamically change colors based on scroll position
      if (window.scrollY % 2 === 0) {
        header.classList.remove("dark");
        header.classList.add("light");
      } else {
        header.classList.remove("light");
        header.classList.add("dark");
      }
    } else {
      header.classList.remove("scrolled", "light", "dark");
    }
  });
});
