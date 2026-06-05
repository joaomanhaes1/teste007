/* =============================================
   AGROFORTE 2026 — SCRIPT.JS
============================================= */

/* ==============================
   1. NAVBAR — scroll effect
============================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

/* ==============================
   2. PARTÍCULAS DO HERO
============================== */
const particlesContainer = document.getElementById('particles');
const NUM_PARTICLES = 22;

for (let i = 0; i < NUM_PARTICLES; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 5 + 2;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * 8}s;
    opacity: ${Math.random() * 0.5 + 0.2};
  `;
  particlesContainer.appendChild(p);
}

/* ==============================
   3. SCROLL REVEAL (Intersection Observer)
============================== */
const revealElements = document.querySelectorAll(
  '.sobre-card, .timeline-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), Number(delay));
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ==============================
   4. CALCULADORA DE CARBONO
============================== */
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const resultadoDiv = document.getElementById('resultado');
const calcForm = document.querySelector('.calc-form');

function animateNumber(el, target, duration = 1200, decimals = 1) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (eased * target).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

calcBtn.addEventListener('click', () => {
  const area = parseFloat(document.getElementById('area').value);

  if (!area || area <= 0) {
    document.getElementById('area').style.borderColor = '#dc5050';
    document.getElementById('area').placeholder = 'Informe um valor válido!';
    setTimeout(() => {
      document.getElementById('area').style.borderColor = '';
      document.getElementById('area').placeholder = 'Ex: 10';
    }, 2000);
    return;
  }

  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    alert('Selecione ao menos uma prática adotada!');
    return;
  }

  let fatorTotal = 0;
  checkboxes.forEach(cb => { fatorTotal += parseFloat(cb.value); });

  const co2 = area * fatorTotal * 0.8;
  const arvores = Math.round(co2 * 45);
  const agua = parseFloat((area * fatorTotal * 12.5).toFixed(1));

  let msg = '';
  if (co2 < 20) {
    msg = '🌱 Ótimo começo! Cada prática adotada já faz diferença para o planeta. Continue ampliando!';
  } else if (co2 < 80) {
    msg = '🌿 Excelente! Sua propriedade já tem um impacto positivo real no sequestro de carbono. Inspire outros produtores!';
  } else {
    msg = '🌳 Impressionante! Sua área é um verdadeiro pulmão verde. Você é um Mestre Regenerativo!';
  }

  calcForm.style.display = 'none';
  resultadoDiv.style.display = 'flex';

  animateNumber(document.getElementById('co2Num'), co2, 1200, 1);
  animateNumber(document.getElementById('arvNum'), arvores, 1200, 0);
  animateNumber(document.getElementById('aguaNum'), agua, 1200, 1);

  document.getElementById('resultadoMsg').textContent = msg;
});

resetBtn.addEventListener('click', () => {
  resultadoDiv.style.display = 'none';
  calcForm.style.display = 'block';
  document.getElementById('area').value = '';
  document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => cb.checked = false);
});

/* ==============================
   5. QUIZ
============================== */
const perguntas = [
  {
    pergunta: 'O que é Agricultura Regenerativa?',
    opcoes: [
      'Um sistema que busca restaurar e melhorar a saúde do solo e dos ecossistemas',
      'Um tipo de agricultura que usa apenas máquinas modernas',
      'Uma técnica que elimina o uso de qualquer planta nativa',
      'Um método que aumenta o uso de agrotóxicos para maior produção'
    ],
    correta: 0,
    explicacao: '✅ Correto! A Agricultura Regenerativa vai além da sustentabilidade — ela busca restaurar ativamente a saúde do solo, da água e da biodiversidade.'
  },
  {
    pergunta: 'Qual é um dos principais benefícios do Plantio Direto?',
    opcoes: [
      'Aumenta o uso de combustível nos tratores',
      'Elimina completamente a necessidade de colheita',
      'Preserva a estrutura do solo e reduz a erosão em até 90%',
      'Substitui a necessidade de sementes'
    ],
    correta: 2,
    explicacao: '✅ Exato! O Plantio Direto evita o revolvimento do solo, preservando sua estrutura, os organismos vivos e a matéria orgânica acumulada.'
  },
  {
    pergunta: 'O que é Sequestro de Carbono no contexto agrícola?',
    opcoes: [
      'A queima de plantas para liberar CO₂',
      'A captura e armazenamento de CO₂ da atmosfera pelo solo e pelas plantas',
      'O uso de máquinas a vapor nas lavouras',
      'A importação de carbono de outros países'
    ],
    correta: 1,
    explicacao: '✅ Correto! Solos e plantas saudáveis capturam CO₂ da atmosfera e armazenam o carbono no solo, ajudando a combater as mudanças climáticas.'
  },
  {
    pergunta: 'Para que serve a Cobertura Vegetal entre safras?',
    opcoes: [
      'Para decorar o campo durante o inverno',
      'Para impedir que qualquer inseto se aproxime',
      'Para proteger o solo, manter umidade e fixar nitrogênio',
      'Para aumentar o pH do solo ao nível máximo'
    ],
    correta: 2,
    explicacao: '✅ Isso mesmo! Plantas como braquiária e crotalária protegem o solo da erosão, mantêm a umidade e ainda fixam nitrogênio, reduzindo custos com adubo.'
  },
  {
    pergunta: 'O que é Agrofloresta?',
    opcoes: [
      'Uma floresta artificial feita de plástico',
      'A integração de árvores com culturas agrícolas e/ou animais no mesmo espaço',
      'Um tipo de irrigação por aspersão em florestas',
      'O desmatamento controlado para plantar soja'
    ],
    correta: 1,
    explicacao: '✅ Correto! Agroflorestas combinam árvores, culturas e animais de forma planejada, criando um sistema produtivo e ecologicamente equilibrado.'
  },
  {
    pergunta: 'Qual prática ajuda a reduzir o uso de fertilizantes químicos?',
    opcoes: [
      'Arar o solo todos os dias',
      'Aumentar a irrigação por inundação',
      'Usar sementes geneticamente modificadas apenas',
      'Compostagem de resíduos orgânicos'
    ],
    correta: 3,
    explicacao: '✅ Muito bem! A Compostagem transforma resíduos orgânicos em adubo natural rico em nutrientes, reduzindo a dependência de fertilizantes químicos.'
  },
  {
    pergunta: 'Como a Integração Lavoura-Pecuária beneficia o solo?',
    opcoes: [
      'Os animais compactam o solo para facilitar o plantio',
      'Os dejetos dos animais fertilizam o solo naturalmente',
      'O gado come as pragas e elimina insetos benéficos',
      'A pecuária não tem nenhuma relação com a saúde do solo'
    ],
    correta: 1,
    explicacao: '✅ Correto! Quando bem planejada, a presença dos animais fertiliza o solo com dejetos e estimula o crescimento das pastagens, criando um ciclo natural.'
  },
  {
    pergunta: 'Qual é o impacto da Agricultura Regenerativa na biodiversidade?',
    opcoes: [
      'Reduz a biodiversidade ao eliminar espécies invasoras',
      'Não tem nenhum impacto sobre insetos e aves',
      'Aumenta a biodiversidade ao reduzir agrotóxicos e diversificar culturas',
      'Substitui toda a fauna nativa por espécies exóticas'
    ],
    correta: 2,
    explicacao: '✅ Perfeito! Ao reduzir agrotóxicos e promover diversidade de culturas, a Agricultura Regenerativa atrai insetos, aves, fungos e microrganismos essenciais para o equilíbrio do ecossistema.'
  }
];

let perguntaAtual = 0;
let pontos = 0;
let acertos = 0;
let respondida = false;

const quizStart = document.getElementById('quizStart');
const quizPergunta = document.getElementById('quizPergunta');
const quizResultado = document.getElementById('quizResultado');
const startQuizBtn = document.getElementById('startQuizBtn');
const nextBtn = document.getElementById('nextBtn');
const refazerBtn = document.getElementById('refazerBtn');

startQuizBtn.addEventListener('click', iniciarQuiz);
nextBtn.addEventListener('click', proximaPergunta);
refazerBtn.addEventListener('click', reiniciarQuiz);

function iniciarQuiz() {
  perguntaAtual = 0;
  pontos = 0;
  acertos = 0;
  respondida = false;

  quizStart.style.display = 'none';
  quizResultado.style.display = 'none';
  quizPergunta.style.display = 'block';

  renderPergunta();
}

function renderPergunta() {
  respondida = false;
  nextBtn.style.display = 'none';

  const feedbackEl = document.getElementById('quizFeedback');
  feedbackEl.style.display = 'none';
  feedbackEl.textContent = '';

  const q = perguntas[perguntaAtual];
  const total = perguntas.length;
  const letras = ['A', 'B', 'C', 'D'];

  // Progresso
  const pct = ((perguntaAtual) / total) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${perguntaAtual + 1} / ${total}`;
  document.getElementById('scoreLive').textContent = pontos;

  // Pergunta
  document.getElementById('quizQ').textContent = q.pergunta;

  // Opções
  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = '';

  q.opcoes.forEach((opcao, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.innerHTML = `<span class="option-letter">${letras[index]}</span>${opcao}`;
    btn.addEventListener('click', () => responder(index, btn));
    optionsContainer.appendChild(btn);
  });
}

function responder(index, btnClicado) {
  if (respondida) return;
  respondida = true;

  const q = perguntas[perguntaAtual];
  const allBtns = document.querySelectorAll('.option-btn');
  const feedbackEl = document.getElementById('quizFeedback');
  const pontosPorPergunta = 10;

  allBtns.forEach(btn => btn.disabled = true);

  if (index === q.correta) {
    btnClicado.classList.add('correct');
    pontos += pontosPorPergunta;
    acertos++;
    document.getElementById('scoreLive').textContent = pontos;
  } else {
    btnClicado.classList.add('wrong');
    allBtns[q.correta].classList.add('correct');
  }

  feedbackEl.textContent = index === q.correta
    ? q.explicacao
    : `❌ Não foi dessa vez! ${q.explicacao.replace('✅ Correto! ', '').replace('✅ Exato! ', '').replace('✅ Isso mesmo! ', '').replace('✅ Muito bem! ', '').replace('✅ Perfeito! ', '')}`;

  feedbackEl.style.borderLeftColor = index === q.correta
    ? 'var(--verde-claro)'
    : '#dc5050';

  feedbackEl.style.display = 'block';
  nextBtn.style.display = 'block';
  nextBtn.textContent = perguntaAtual < perguntas.length - 1 ? 'Próxima →' : 'Ver Resultado 🏆';
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    renderPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  quizPergunta.style.display = 'none';
  quizResultado.style.display = 'block';

  document.getElementById('progressFill').style.width = '100%';

  document.getElementById('resultAcertos').textContent = acertos;
  document.getElementById('resultPontos').textContent = pontos;

  let emoji, titulo, msg, stars;

  if (acertos <= 3) {
    emoji = '🌱';
    titulo = 'Semente Curiosa';
    msg = 'Você deu o primeiro passo! A jornada rumo à Agricultura Regenerativa começa com a curiosidade. Reveja o conteúdo do site e tente novamente!';
    stars = '⭐';
  } else if (acertos <= 6) {
    emoji = '🌿';
    titulo = 'Guardião do Solo';
    msg = 'Muito bem! Você já conhece bastante sobre práticas regenerativas. Com um pouco mais de estudo, chegará ao nível máximo!';
    stars = '⭐⭐⭐';
  } else {
    emoji = '🌳';
    titulo = 'Mestre da Terra';
    msg = 'Parabéns! Você domina os princípios da Agricultura Regenerativa. O planeta agradece por ter um defensor como você!';
    stars = '⭐⭐⭐⭐⭐';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitulo').textContent = titulo;
  document.getElementById('resultMsg').textContent = msg;
  document.getElementById('resultStars').textContent = stars;
}

function reiniciarQuiz() {
  quizResultado.style.display = 'none';
  iniciarQuiz();
}