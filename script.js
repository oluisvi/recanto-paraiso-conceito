(() => {
  const designs = [...document.querySelectorAll('.design-view')];
  const switchButtons = [...document.querySelectorAll('.concept-button')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = [
    '.trail-meta > *', '.trail-section', '.ride-row', '.trail-note > *',
    '.location-panel > *', '.trail-booking > *', '.site-footer > *',
    '.field-opening > *', '.field-offer', '.field-vivencia', '.field-info > *',
    '.field-territory > *', '.field-contact-section > *', '.field-map-panel > *', '.field-footer > *',
    '.portal-hero-copy', '.portal-hero-image', '.portal-choices-intro', '.portal-offer',
    '.portal-plan > *', '.portal-local > *', '.portal-contact > *', '.portal-map-panel > *', '.portal-footer > *'
  ].join(',');
  const revealObserver = 'IntersectionObserver' in window && !reduceMotion.matches
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    : null;

  function prepareMotion(view) {
    const targets = [...view.querySelectorAll(revealTargets)];
    targets.forEach((element, index) => {
      if (!element.hasAttribute('data-motion')) {
        element.setAttribute('data-motion', 'reveal');
        element.style.setProperty('--reveal-order', String(index % 6));
      }
      if (element.classList.contains('is-revealed')) return;
      if (!revealObserver) element.classList.add('is-revealed');
      else revealObserver.observe(element);
    });
  }

  function showDesign(name, focus = false) {
    const current = designs.find((view) => !view.hidden);
    if (current?.dataset.view === name) {
      if (!current.classList.contains('is-entering')) {
        current.classList.add('is-entering');
        window.setTimeout(() => current.classList.remove('is-entering'), reduceMotion.matches ? 20 : 900);
      }
      prepareMotion(current);
      if (focus) switchButtons.find((button) => button.dataset.design === name)?.focus();
      return;
    }
    designs.forEach((view) => {
      const active = view.dataset.view === name;
      view.hidden = !active;
      view.classList.toggle('is-visible', active);
      view.classList.remove('is-entering');
      if (active) {
        view.classList.add('is-entering');
        window.setTimeout(() => view.classList.remove('is-entering'), reduceMotion.matches ? 20 : 900);
        prepareMotion(view);
      }
    });
    switchButtons.forEach((button) => {
      const active = button.dataset.design === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      if (active && focus) button.focus();
    });
    history.replaceState(null, '', `#${name}`);
      window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  switchButtons.forEach((button, index) => {
    button.addEventListener('click', () => showDesign(button.dataset.design));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? switchButtons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : switchButtons.length - 1)) % switchButtons.length;
      showDesign(switchButtons[nextIndex].dataset.design, true);
    });
  });

  const initial = location.hash.slice(1);
  if (['trilha', 'caderno', 'portal'].includes(initial)) showDesign(initial);
  else {
    const activeDesign = designs.find((view) => !view.hidden);
    if (activeDesign) {
      activeDesign.classList.add('is-entering');
      window.setTimeout(() => activeDesign.classList.remove('is-entering'), reduceMotion.matches ? 20 : 900);
      prepareMotion(activeDesign);
    }
  }

  document.querySelectorAll('[data-interest]').forEach((control) => {
    control.addEventListener('click', (event) => {
      const value = control.dataset.interest;
      const design = control.closest('.design-view');
      const select = design?.querySelector('.interest-select');
      if (select) {
        const option = [...select.options].find((item) => item.value === value);
        if (option) select.value = value;
      }
      if (control.matches('a')) event.preventDefault();
      design?.querySelector('#field-contact, #reserva, #portal-plan')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      window.setTimeout(() => design?.querySelector('.interest-select')?.focus({ preventScroll: true }), 350);
    });
  });

  document.querySelectorAll('.whatsapp-cta').forEach((link) => {
    link.addEventListener('click', () => {
      const design = link.closest('.design-view');
      const selected = design?.querySelector('.interest-select')?.value || 'Tenho uma pergunta sobre os passeios do Recanto Paraíso';
      const message = `Olá! Tenho interesse em conhecer o Recanto Paraíso. Gostaria de consultar: ${selected}. Podem me informar disponibilidade, ponto de encontro e orientações?`;
      link.href = `https://wa.me/5511912018976?text=${encodeURIComponent(message)}`;
    });
  });

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox.querySelector('img');
  let previouslyFocused = null;
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
    previouslyFocused?.focus();
  }
  document.querySelectorAll('[data-lightbox]').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Ampliar imagem: ${image.alt}`);
    const open = () => {
      previouslyFocused = image;
      lightboxImage.src = image.dataset.fullImage || image.src.replace(/\.webp(?=($|\?))/, '-original.png');
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      lightbox.querySelector('.lightbox-close').focus();
      document.body.style.overflow = 'hidden';
    };
    image.addEventListener('click', open);
    image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
})();
