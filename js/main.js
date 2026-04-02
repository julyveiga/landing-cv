/* ── CANVAS HERO ─────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
  }

  function init() {
    resize();
    nodes = Array.from({ length: 80 }, () => new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => n.update());

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,0.6)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
})();


/* ── NAV SCROLL ──────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


/* ── MOBILE MENU ─────────────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('active', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});


/* ── REVEAL ON SCROLL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});


/* ── MODAL ───────────────────────────────────────────────── */
const caseData = {
  abinbev: {
    company: 'AB InBev',
    title: 'CoE Global de Produto & Design para Zé Delivery e TaDa',
    challenge: 'Construir do zero uma estrutura de Centro de Excelência capaz de operar em múltiplos países com consistência de processo, qualidade de produto e escala.',
    bullets: [
      'Estruturação completa do CoE — contratação, rituais, ferramentas e métricas',
      'Framework de maturidade de produto criado e aplicado como régua de evolução',
      'Hub de IA para produção de conteúdo e assets visuais em escala global',
      'Plataforma de pesquisa com IA para centralizar e ativar insights de usuário',
      'Design System implementado como produto — com roadmap e governança próprios',
    ],
    result: '2,7 → 4,1',
    resultLabel: 'Índice de maturidade de produto em 18 meses',
  },
  natura: {
    company: 'Natura',
    title: 'Design System unificado para 3 marcas globais em 6 anos',
    challenge: 'Depois da aquisição de Avon e The Body Shop, unificar a linguagem de design de 3 marcas com identidades distintas em uma infraestrutura compartilhada e escalável.',
    bullets: [
      'Design System criado e evoluído para cobrir Natura, Avon e The Body Shop',
      'Time de Design Ops estruturado para operar o sistema de forma autônoma',
      'Plataforma de pesquisa com IA implantada para síntese de insights contínua',
      'Processos de qualidade criados para garantir consistência entre mercados',
      'Rituais de design leadership estabelecidos nas três marcas',
    ],
    result: '3 marcas globais',
    resultLabel: 'com linguagem visual e operação de design consistentes',
  },
  unico: {
    company: 'Unico (idtech)',
    title: 'Design Operations do zero em empresa de identidade digital',
    challenge: 'Em uma idtech de crescimento acelerado, criar a área de Design Operations sem estrutura prévia — e tornar o trabalho de design visível, mensurável e conectado ao negócio.',
    bullets: [
      'Área de Design Ops criada e organizada do zero',
      'Ways of Working com IA integrados ao ciclo de discovery e entrega',
      'Métricas de upstream implantadas — qualidade de experiência rastreável antes do código',
      'Framework de priorização de problemas de experiência com critérios de negócio',
      'Estrutura de onboarding de designers criada para escalar o time rapidamente',
    ],
    result: '94%',
    resultLabel: 'dos problemas de experiência identificados e resolvidos antes da produção',
  },
  rd: {
    company: 'Raia Drogasil (RD)',
    title: 'Primeira área de Design Operations no maior varejo farmacêutico do Brasil',
    challenge: 'Criar do zero a prática de Design Operations em uma empresa com mais de 2.500 lojas, conectando o trabalho de design a um negócio complexo, regulado e de alto volume.',
    bullets: [
      'Primeira área de Design Ops da RD — estruturada, nomeada e operando',
      'Framework de entrega de design conectado diretamente ao roadmap de produto',
      'Rituais de liderança de design instituídos como prática recorrente',
      'Governança de design criada para garantir consistência em múltiplos times',
      'Onboarding e capacitação de designers em práticas de produto e operações',
    ],
    result: 'Operação de design',
    resultLabel: 'escalável em empresa com +2.500 lojas e alto volume de projetos simultâneos',
  },
};

function openModal(id) {
  const data = caseData[id];
  if (!data) return;

  document.getElementById('modalBody').innerHTML = `
    <p class="modal-company">${data.company}</p>
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-section-title">Desafio</p>
    <p class="modal-text">${data.challenge}</p>
    <p class="modal-section-title">O que foi feito</p>
    <ul class="modal-bullets">
      ${data.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
    <p class="modal-section-title">Resultado</p>
    <p class="modal-result-big">${data.result}</p>
    <p class="modal-text" style="margin-top:0.5rem">${data.resultLabel}</p>
  `;

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* expose to HTML onclick attributes */
window.openModal  = openModal;
window.closeModal = closeModal;
window.closeModalOutside = closeModalOutside;
