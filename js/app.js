(function () {
  'use strict';

  const WA = '5511994825556';
  const LOGO = 'assets/brand/logo-panobianco-mono.svg';
  const TOUR_URL = 'https://www.panobiancoacademia.com.br/academias/yervant';

  const msgs = {
    default: 'Olá! Vi o site da Panobianco Yervant e quero mais informações.',
    silver: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Silver.',
    gold: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Gold.',
    platinum: 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Platinum.',
    'platinum-plus': 'Olá! Vi o site da Panobianco Yervant e quero informações sobre o Plano Platinum+.',
    horarios: 'Olá! Gostaria de confirmar a grade de horários das aulas coletivas na Yervant.',
    avaliacao: 'Olá! Gostaria de agendar uma avaliação física na Panobianco Yervant.',
    cta: 'Olá! Vi o site da Panobianco Yervant e quero começar a treinar.',
    tour: 'Olá! Vi o Tour Virtual da Yervant e quero mais informações.',
    visita: 'Olá! Quero agendar uma visita à unidade Yervant.',
  };

  function waLink(key, extra) {
    let text = msgs[key] || msgs.default;
    if (extra) text += ' ' + extra;
    return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  }

  function bindWhatsApp(root) {
    (root || document).querySelectorAll('[data-whatsapp]').forEach((el) => {
      const k = el.dataset.whatsapp || 'default';
      el.href = waLink(k);
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
  }
  bindWhatsApp();

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

  function setMenuOpen(open) {
    mobileNav?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    document.body.classList.toggle('nav-open', open);
    menuBtn?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  menuBtn?.addEventListener('click', () => {
    setMenuOpen(!mobileNav.classList.contains('open'));
  });
  mobileNav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) setMenuOpen(false);
  });

  /* Scroll spy */
  const sections = ['inicio', 'planos', 'estrutura', 'aulas', 'localizacao'];
  const navLinks = document.querySelectorAll('[data-nav]');
  function updateSpy() {
    const y = window.scrollY + 100;
    let current = 'inicio';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateSpy, { passive: true });
  updateSpy();

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
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

  /* Modal */
  const overlay = document.getElementById('modal');
  const mTitle = document.getElementById('modal-title');
  const mBody = document.getElementById('modal-body');
  const mClose = document.getElementById('modal-close');
  let prevFocus = null;

  const scheduleHtml = `
    <p class="text-[#A3A3A3] text-sm mb-4 leading-relaxed">Programação de referência das aulas coletivas. <strong class="text-[#E5E5E5]">Horários podem mudar</strong> — confirme sempre com a equipe no WhatsApp antes de ir.</p>
    <div class="space-y-3 text-sm">
      ${[
        ['FitDance & Zumba', 'Consulte grade atualizada'],
        ['Spinning', 'Consulte grade atualizada'],
        ['Funcional & Ritbox', 'Consulte grade atualizada'],
        ['Pilates & Yoga', 'Consulte grade atualizada'],
        ['Artes Marciais & Jump', 'Consulte grade atualizada'],
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
    <p class="text-[#A3A3A3] text-sm mb-5 leading-relaxed">Explore a unidade Yervant no tour oficial Panobianco — musculação, aulas e ambientes.</p>
    <div class="rounded-2xl overflow-hidden border border-white/5 mb-5 aspect-video bg-[#0A0A0A] flex items-center justify-center relative">
      <img src="${LOGO}" alt="" class="h-10 opacity-30 absolute" width="140" height="32">
      <a href="${TOUR_URL}" target="_blank" rel="noopener noreferrer"
         class="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm relative z-10">
        Abrir Tour Virtual
      </a>
    </div>
    <p class="text-xs text-[#A3A3A3] text-center">Você será direcionado ao site oficial da unidade.</p>
    <a href="${waLink('tour')}" data-whatsapp="tour" target="_blank" rel="noopener noreferrer"
       class="btn-outline mt-4 w-full inline-flex items-center justify-center px-6 py-3.5 text-sm">
      Tirar dúvidas no WhatsApp
    </a>
  `;

  function openModal(title, html) {
    prevFocus = document.activeElement;
    mTitle.textContent = title;
    mBody.innerHTML = html;
    bindWhatsApp(mBody);
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('nav-open');
    mClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (!mobileNav?.classList.contains('open')) {
      document.body.classList.remove('nav-open');
    }
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

  /* Lazy-load Google Maps iframe when near viewport */
  (function lazyMap() {
    const iframe = document.querySelector('iframe[data-map][data-src]');
    if (!iframe) return;
    const load = () => {
      if (!iframe.dataset.src) return;
      iframe.src = iframe.dataset.src;
      delete iframe.dataset.src;
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            io.disconnect();
          }
        },
        { rootMargin: '240px 0px' }
      );
      io.observe(iframe);
    } else {
      load();
    }
  })();

  /* ===== Hero Carousel (5s autoplay, pause on hover) ===== */
  (function initHeroCarousel() {
    const root = document.querySelector('[data-hero-carousel]');
    if (!root) return;

    const slides = Array.from(root.querySelectorAll('[data-slide]'));
    const btnPrev = root.querySelector('[data-hero-prev]');
    const btnNext = root.querySelector('[data-hero-next]');
    const dotsWrap = root.querySelector('[data-hero-dots]');
    const progress = root.querySelector('[data-hero-progress]');
    const interval = Number(root.dataset.interval) || 5000;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let index = 0;
    let timer = null;
    let paused = false;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function paint() {
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      restartProgress();
    }

    function restartProgress() {
      if (!progress) return;
      root.classList.remove('is-playing');
      void progress.offsetWidth;
      if (!paused && !reduced) root.classList.add('is-playing');
    }

    function goTo(i, user) {
      index = (i + slides.length) % slides.length;
      paint();
      if (user) restartAutoplay();
    }

    function next() { goTo(index + 1); }

    function startAutoplay() {
      stopAutoplay();
      if (reduced || paused) return;
      root.classList.add('is-playing');
      timer = window.setInterval(next, interval);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
      root.classList.remove('is-playing');
    }

    function restartAutoplay() {
      stopAutoplay();
      if (!paused) startAutoplay();
    }

    btnNext?.addEventListener('click', () => goTo(index + 1, true));
    btnPrev?.addEventListener('click', () => goTo(index - 1, true));

    root.addEventListener('mouseenter', () => { paused = true; stopAutoplay(); });
    root.addEventListener('mouseleave', () => { paused = false; startAutoplay(); });
    root.addEventListener('focusin', () => { paused = true; stopAutoplay(); });
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) {
        paused = false;
        startAutoplay();
      }
    });

    let touchX = null;
    root.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches[0].clientX;
      paused = true;
      stopAutoplay();
    }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1), true);
      paused = false;
      startAutoplay();
    }, { passive: true });

    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1, true); }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else if (!paused) startAutoplay();
    });

    paint();
    startAutoplay();
  })();
})();
