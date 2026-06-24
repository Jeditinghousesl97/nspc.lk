const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => menu.classList.toggle('open'));
}

document.querySelectorAll('.menu a').forEach((anchor) => {
  anchor.addEventListener('click', () => menu?.classList.remove('open'));
});

const back = document.querySelector('.backtop');

window.addEventListener('scroll', () => {
  if (back) {
    back.style.display = window.scrollY > 500 ? 'block' : 'none';
  }
});

back?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const feedbackSlider = document.querySelector('[data-feedback-slider]');

if (feedbackSlider) {
  const cards = Array.from(feedbackSlider.querySelectorAll('.feedback-card'));
  const dots = Array.from(feedbackSlider.querySelectorAll('.slider-dot'));
  let activeIndex = 0;
  let autoRotate;

  const setActiveSlide = (index) => {
    cards.forEach((card, cardIndex) => {
      card.classList.toggle('is-active', cardIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    activeIndex = index;
  };

  const startAutoRotate = () => {
    autoRotate = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % cards.length;
      setActiveSlide(nextIndex);
    }, 4500);
  };

  const stopAutoRotate = () => {
    window.clearInterval(autoRotate);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoRotate();
      setActiveSlide(index);
      startAutoRotate();
    });
  });

  feedbackSlider.addEventListener('mouseenter', stopAutoRotate);
  feedbackSlider.addEventListener('mouseleave', startAutoRotate);

  setActiveSlide(0);
  startAutoRotate();
}

const form = document.querySelector('#contactForm');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.querySelector('[name=name]').value.trim();
  const email = form.querySelector('[name=email]').value.trim();
  const message = form.querySelector('[name=message]').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all required fields.');
    return;
  }

  alert('Thank you. Your inquiry is ready to submit. Please connect this form to your hosting mail script.');
  form.reset();
});
