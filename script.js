function navigateTo(sectionId) {
  const sections = ['home', 'about', 'modules', 'quiz', 'daily-tip', 'resources'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== sectionId);
  });
}

function goToNextSection(currentId) {
  const order = ['home', 'about', 'modules', 'quiz', 'daily-tip', 'resources'];
  const currentIndex = order.indexOf(currentId);
  if (currentIndex !== -1 && currentIndex < order.length - 1) {
    const nextId = order[currentIndex + 1];
    navigateTo(nextId);
    document.getElementById(nextId).scrollIntoView({ behavior: 'smooth' });
  }
}

// Matrix background animation
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const letters = "01".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(10, 25, 47, 0.05)"; // match background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0ff";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.onload = () => {
  navigateTo('home');
  fetchQuiz();
  loadCyberTip();
};

let quizData = [];
let currentQuestion = 0;
const quizContainer = document.getElementById("quiz-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-quiz");
const resultContainer = document.getElementById("quiz-result");
const counter = document.getElementById("question-counter");

async function fetchQuiz() {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
    const data = await res.json();
    quizData = data.results.map(q => {
      const options = [...q.incorrect_answers];
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, q.correct_answer);
      return {
        question: decodeHTML(q.question),
        options: options.map(decodeHTML),
        correctIndex,
        selectedIndex: null
      };
    });
    showQuestion(0);
  } catch (error) {
    quizContainer.innerHTML = `<p>Failed to load quiz. Please check your internet connection.</p>`;
  }
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showQuestion(index) {
  const q = quizData[index];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) => `
      <label><input type="radio" name="quiz" value="${i}" ${q.selectedIndex === i ? "checked" : ""}> ${opt}</label><br>
    `).join("")}
  `;
  counter.textContent = `Question ${index + 1} of ${quizData.length}`;
  prevBtn.disabled = index === 0;
  nextBtn.style.display = index === quizData.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = index === quizData.length - 1 ? "inline-block" : "none";
}

quizContainer.addEventListener("change", (e) => {
  quizData[currentQuestion].selectedIndex = parseInt(e.target.value);
});

prevBtn?.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

nextBtn?.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
});

submitBtn?.addEventListener("click", () => {
  const score = quizData.reduce((acc, q) =>
    acc + (q.selectedIndex === q.correctIndex ? 1 : 0), 0);
  resultContainer.innerHTML = `<h3>You scored ${score} out of ${quizData.length}</h3>`;
});

async function loadCyberTip() {
  const tipEl = document.getElementById("tip-text");
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    tipEl.textContent = `💡 ${data.slip.advice}`;
  } catch (err) {
    tipEl.textContent = "💡 Tip: Always use multi-factor authentication to secure your accounts.";
  }
}


