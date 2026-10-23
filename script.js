(() => {
  const designs = [...document.querySelectorAll('.design-view')];
  const switchButtons = [...document.querySelectorAll('.concept-button')];

  function showDesign(name, focus = false) {
    designs.forEach((view) => {
      const active = view.dataset.view === name;
      view.hidden = !active;
      view.classList.toggle('is-visible', active);
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
