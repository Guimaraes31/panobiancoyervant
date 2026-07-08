(function () {
  'use strict';

  const WA = '5511994825556';
  const LOGO = 'https://cdn.prod.website-files.com/67ec66139f8f56d61a1cd4c9/68a4b16e82a17a6f497bb192_Logo-Panobianco-mono-claro.svg';
  const TOUR_URL = 'https://www.panobiancoacademia.com.br/academias/yervant';

  const msgs = {
    default: 'Olá! Vi o site da Panobianco Yervant e quero mais informações.',
    silver: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Silver.',
    gold: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Gold.',
    platinum: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Platinum.',
    'platinum-plus': 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Platinum+.',
    horarios: 'Olá! Gostaria de saber a grade de horários das aulas coletivas na Yervant.',
    avaliacao: 'Olá! Gostaria de agendar uma avaliação física gratuita na Panobianco Yervant.',
    cta: 'Olá! Vi o site da Panobianco Yervant e quero começar a treinar.',
    tour: 'Olá! Vi o Tour Virtual da Yervant e quero mais informações.',
  };

  function waLink(key, extra) {
    let text = msgs[key] || msgs.default;
    if (extra) text += ' ' + extra;
    return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  }

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const k = el.dataset.whatsapp || 'default';
    el.href = waLink(k);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  /* Navbar */
  const nav = document.getElementById('navbar');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 36);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  menuBtn?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  });
  mobileNav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });

  /* Reveal */
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

  /* Modal */
  const overlay = document.getElementById('modal');
  const mTitle = document.getElementById('modal-title');
  const mBody = document.getElementById('modal-body');
  const mClose = document.getElementById('modal-close');
  let prevFocus = null;

  const scheduleHtml = `
    <p class="text-[#A3A3A3] text-sm mb-5 leading-relaxed">Programação de aulas coletivas na unidade Yervant. Horários sujeitos a alteração — confirme com nossa equipe.</p>
    <div class="space-y-3 text-sm">
      ${[
        ['FitDance & Zumba', 'Seg, Qua, Sex — 19h30'],
        ['Spinning', 'Ter, Qui — 07h e 20h'],
        ['Funcional & Ritbox', 'Seg a Sex — 06h30 e 18h30'],
        ['Pilates & Yoga', 'Ter, Qui — 10h · Sáb — 09h30'],
        ['Artes Marciais & Jump', 'Qua, Sex — 20h30 · Sáb — 10h30'],
      ].map(([t, h]) => `
        <div class="p-4 rounded-2xl bg-[#0A0A0A] border border-white/5">
          <p class="font-semibold text-[#FF6B00]">${t}</p>
          <p class="text-[#E5E5E5] mt-1">${h}</p>
        </div>
      `).join('')}
    </div>
    <a href="${waLink('horarios')}" data-whatsapp="horarios" target="_blank" rel="noopener noreferrer"
       class="btn-primary mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 text-sm">
      Confirmar horários no WhatsApp
    </a>
  `;

  const tourHtml = `
    <p class="text-[#A3A3A3] text-sm mb-5 leading-relaxed">Explore cada ambiente da unidade Yervant — musculação, aulas coletivas, vestiários e muito mais.</p>
    <div class="rounded-2xl overflow-hidden border border-white/5 mb-5 aspect-video bg-[#0A0A0A] flex items-center justify-center">
      <img src="${LOGO}" alt="Panobianco" class="h-10 opacity-40 mb-4 absolute">
      <a href="${TOUR_URL}" target="_blank" rel="noopener noreferrer"
         class="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm relative z-10">
        Abrir Tour Virtual
      </a>
    </div>
    <p class="text-xs text-[#A3A3A3] text-center">Você será direcionado ao tour oficial da unidade.</p>
    <a href="${waLink('tour')}" data-whatsapp="tour" target="_blank" rel="noopener noreferrer"
       class="btn-outline mt-4 w-full inline-flex items-center justify-center px-6 py-3.5 text-sm">
      Tirar dúvidas no WhatsApp
    </a>
  `;

  function openModal(title, html) {
    prevFocus = document.activeElement;
    mTitle.textContent = title;
    mBody.innerHTML = html;
    mBody.querySelectorAll('[data-whatsapp]').forEach((el) => {
      el.href = waLink(el.dataset.whatsapp || 'default');
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    prevFocus?.focus();
  }

  document.querySelectorAll('[data-modal="schedule"]').forEach((b) => {
    b.addEventListener('click', () => openModal('Grade de Horários', scheduleHtml));
  });
  document.querySelectorAll('[data-modal="tour"]').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Tour Virtual', tourHtml);
    });
  });

  mClose?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  /* Lead form */
  const leadForm = document.getElementById('lead-form');
  leadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('lead-name')?.value.trim();
    const phone = document.getElementById('lead-phone')?.value.trim();
    if (!name || !phone) return;
    const extra = `Meu nome é ${name}, telefone ${phone}.`;
    window.open(waLink('default', extra), '_blank', 'noopener,noreferrer');
  });

  /* Aulas — carrossel infinito (duplica cards para loop contínuo) */
  const classesTrack = document.getElementById('classes-carousel-track');
  if (classesTrack) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      [...classesTrack.children].forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        classesTrack.appendChild(clone);
      });
    }
  }

  /* Testimonials scroll */
  const tTrack = document.getElementById('testimonials-track');
  document.getElementById('t-prev')?.addEventListener('click', () => {
    tTrack?.scrollBy({ left: -320, behavior: 'smooth' });
  });
  document.getElementById('t-next')?.addEventListener('click', () => {
    tTrack?.scrollBy({ left: 320, behavior: 'smooth' });
  });
})();