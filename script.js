// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// Carousel
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const progressBar = document.getElementById('progressBar');
const slides = track.querySelectorAll('.carousel-slide');
const TOTAL = slides.length, AUTO_DELAY = 4500;
let current = 0, autoTimer;

slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => { clearAuto(); goTo(i); startAuto(); });
  dotsWrap.appendChild(d);
});

function updateDots() { dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current)); }
function goTo(idx) { current = (idx + TOTAL) % TOTAL; track.style.transform = `translateX(-${current * 100}%)`; updateDots(); resetProg(); }
document.getElementById('prevBtn').addEventListener('click', () => { clearAuto(); goTo(current - 1); startAuto(); });
document.getElementById('nextBtn').addEventListener('click', () => { clearAuto(); goTo(current + 1); startAuto(); });
function resetProg() { progressBar.style.transition = 'none'; progressBar.style.width = '0%'; requestAnimationFrame(() => { progressBar.style.transition = `width ${AUTO_DELAY}ms linear`; progressBar.style.width = '100%'; }); }
function startAuto() { resetProg(); autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY); }
function clearAuto() { clearInterval(autoTimer); progressBar.style.transition = 'none'; progressBar.style.width = '0%'; }
let tX = 0;
track.addEventListener('touchstart', e => { tX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => { const d = tX - e.changedTouches[0].clientX; if (Math.abs(d) > 40) { clearAuto(); goTo(d > 0 ? current + 1 : current - 1); startAuto(); } });
track.closest('.carousel-wrap').addEventListener('mouseenter', clearAuto);
track.closest('.carousel-wrap').addEventListener('mouseleave', startAuto);
startAuto();

// Form submit
// WhatsApp Form Submission Logic
document.getElementById('submitBtn').addEventListener('click', function() {
  // 1. Get the values entered by the user
  const name = document.getElementById('wa-name').value.trim();
  const phone = document.getElementById('wa-phone').value.trim();
  const email = document.getElementById('wa-email').value.trim();
  const service = document.getElementById('wa-service').value;
  const message = document.getElementById('wa-message').value.trim();

  // 2. Simple Validation Check
  if (!name || !phone || !service) {
    alert('Please fill in your Name, Phone Number, and Select a Service.');
    return;
  }

  // 3. Construct a professional message layout
  let textTemplate = `🚨 *NEW SECURITY INQUIRY* 🚨\n\n`;
  textTemplate += `👤 *Name:* ${name}\n`;
  textTemplate += `📞 *Phone:* ${phone}\n`;
  if (email) textTemplate += `📧 *Email:* ${email}\n`;
  textTemplate += `🛠️ *Service:* ${service}\n`;
  if (message) textTemplate += `📝 *Requirements:* ${message}\n`;

  // 4. Target your company WhatsApp Number (using international country code format: 917621975177)
  const targetNumber = "917621975177";
  
  // 5. Build up the final API URL string
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(textTemplate)}`;

  // 6. Give visual feedback on the button before redirecting
  this.textContent = '✓ Opening WhatsApp...';
  this.style.background = '#1a6b1a';

  // 7. Open the generated WhatsApp link in a new tab or window
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    // Reset the button state
    this.textContent = 'Send to WhatsApp →';
    this.style.background = '';
  }, 800);
});
