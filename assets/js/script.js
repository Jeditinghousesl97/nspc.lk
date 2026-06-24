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
  const controls = feedbackSlider.querySelector('.slider-controls');
  const prevButton = feedbackSlider.querySelector('[data-slider-prev]');
  const nextButton = feedbackSlider.querySelector('[data-slider-next]');
  let dots = [];
  let activeIndex = 0;
  let pageSize = 3;
  let totalPages = 0;
  let autoRotate;

  const getPageSize = () => {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const buildDots = () => {
    controls.innerHTML = '';
    totalPages = Math.ceil(cards.length / pageSize);

    for (let index = 0; index < totalPages; index += 1) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show review group ${index + 1}`);
      dot.addEventListener('click', () => {
        stopAutoRotate();
        setActiveSlide(index);
        startAutoRotate();
      });
      controls.appendChild(dot);
    }

    dots = Array.from(controls.querySelectorAll('.slider-dot'));
  };

  const setActiveSlide = (index) => {
    const start = index * pageSize;
    const end = start + pageSize;

    cards.forEach((card, cardIndex) => {
      card.classList.toggle('is-active', cardIndex >= start && cardIndex < end);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    activeIndex = index;
  };

  const startAutoRotate = () => {
    stopAutoRotate();
    autoRotate = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalPages;
      setActiveSlide(nextIndex);
    }, 4500);
  };

  const stopAutoRotate = () => {
    window.clearInterval(autoRotate);
  };

  const goToPrevious = () => {
    const previousIndex = (activeIndex - 1 + totalPages) % totalPages;
    setActiveSlide(previousIndex);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % totalPages;
    setActiveSlide(nextIndex);
  };

  const syncSliderLayout = () => {
    const nextPageSize = getPageSize();

    if (nextPageSize !== pageSize || dots.length === 0) {
      pageSize = nextPageSize;
      buildDots();
      activeIndex = Math.min(activeIndex, totalPages - 1);
      setActiveSlide(Math.max(activeIndex, 0));
      startAutoRotate();
    }
  };

  feedbackSlider.addEventListener('mouseenter', stopAutoRotate);
  feedbackSlider.addEventListener('mouseleave', startAutoRotate);
  prevButton?.addEventListener('click', () => {
    stopAutoRotate();
    goToPrevious();
    startAutoRotate();
  });
  nextButton?.addEventListener('click', () => {
    stopAutoRotate();
    goToNext();
    startAutoRotate();
  });
  window.addEventListener('resize', syncSliderLayout);

  syncSliderLayout();
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
