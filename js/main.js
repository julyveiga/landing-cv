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


/* ── MODAL DATA ──────────────────────────────────────────── */
const caseData = {
  abinbev: {
    company: 'AB InBev',
    title: 'Global Head Product & Design (CoE)',
    challenge: 'Construir do zero um Centro de Excelência global de Produto & Design capaz de operar em múltiplos países com consistência de processo, qualidade e escala.',
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
    company: 'Natura & Co',
    title: 'Design System para 3 marcas globais em 6 anos',
    challenge: 'Após a aquisição de Avon e The Body Shop, unificar a linguagem de design de 3 marcas com identidades distintas em uma infraestrutura compartilhada e escalável.',
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
    company: 'Unico ID Tech',
    title: 'Design Operations do zero em idtech de alta escala',
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
    company: 'Raia Drogasil',
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

window.openModal         = openModal;
window.closeModal        = closeModal;
window.closeModalOutside = closeModalOutside;
