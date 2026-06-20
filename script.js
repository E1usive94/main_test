const form = document.querySelector('#opinionForm');
const input = document.querySelector('#opinionInput');
const cloud = document.querySelector('#wordCloud');
const emptyState = document.querySelector('#emptyState');
const screenModeBtn = document.querySelector('#screenModeBtn');
const resetBtn = document.querySelector('#resetBtn');

const STORAGE_KEY = 'nv2026-opinion-cloud';
const banned = ['дурак', 'идиот', 'блин'];

const starterWords = [
  'команда', 'развитие', 'идеи', 'движ', 'педагоги', 'творчество',
  'спорт', 'атмосфера', 'дружба', 'энергия'
];

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:()"'«»]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 60);
}

function isAllowed(text) {
  return text.length > 1 && !banned.some(word => text.includes(word));
}

function getOpinions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return starterWords;
  try { return JSON.parse(raw); } catch { return starterWords; }
}

function saveOpinions(opinions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(opinions));
}

function countWords(opinions) {
  return opinions.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function renderCloud() {
  const opinions = getOpinions();
  const counts = countWords(opinions);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, count]) => count), 1);

  cloud.innerHTML = '';
  emptyState.style.display = entries.length ? 'none' : 'grid';

  entries.forEach(([word, count]) => {
    const el = document.createElement('span');
    const size = 22 + (count / max) * 58;
    el.className = 'word';
    el.textContent = word;
    el.title = `${count} мн.`;
    el.style.fontSize = `${size}px`;
    el.style.fontWeight = `${650 + Math.min(count * 45, 250)}`;
    cloud.appendChild(el);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const opinion = normalize(input.value);

  if (!isAllowed(opinion)) {
    input.value = '';
    input.placeholder = 'Попробуй другое слово 🙂';
    return;
  }

  const opinions = getOpinions();
  opinions.push(opinion);
  saveOpinions(opinions);
  input.value = '';
  renderCloud();
});

screenModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('screen');
  screenModeBtn.textContent = document.body.classList.contains('screen') ? 'Обычный режим' : 'Режим экрана';
});

resetBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderCloud();
});

renderCloud();
